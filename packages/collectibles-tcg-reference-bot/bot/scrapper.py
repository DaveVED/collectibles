#!/usr/bin/env python
"""
Scraper Module for TCGPlayer Price Guides

This script scrapes card data from specified TCGPlayer price guide URLs
and saves the data into CSV and JSON files for further processing.
"""

import sys
from pathlib import Path

# Determine the project root directory (one level above 'bot')
project_root = Path(__file__).resolve().parent.parent

# Add the project root to sys.path
sys.path.insert(0, str(project_root))

import json
import re
import time
from datetime import datetime
from uuid import uuid4
from decimal import Decimal

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd
from tqdm import tqdm
from pathlib import Path

from bot.custom_json_encoder import DecimalEncoder
from bot.logger import setup_logger


def setup_driver(headless=True):
    """
    Initializes and returns a Selenium WebDriver with Firefox.

    Parameters:
        headless (bool): Whether to run Firefox in headless mode.

    Returns:
        webdriver.Firefox: Configured Selenium Firefox WebDriver.
    """
    firefox_options = Options()
    if headless:
        firefox_options.add_argument("--headless")
    driver = webdriver.Firefox(options=firefox_options)
    return driver


def load_urls(file_path, logger):
    """
    Loads and returns a list of URLs from the specified text file.

    Parameters:
        file_path (Path): Path to the text file containing URLs.
        logger (logging.Logger): Logger instance for logging.

    Returns:
        list: List of URLs to scrape.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            urls = [line.strip() for line in f if line.strip() and not line.startswith('#')]
        logger.info(f"Loaded {len(urls)} URLs from {file_path}")
        return urls
    except Exception as e:
        logger.error(f"Failed to read URLs from {file_path}: {e}")
        raise


def extract_set_name(url):
    """
    Extracts and formats the set name from a given URL.

    Parameters:
        url (str): The URL to extract the set name from.

    Returns:
        str: The extracted and formatted set name, or "Unknown Set" if not found.
    """
    match = re.search(r'/price-guides/([^/]+)', url)
    if match:
        return match.group(1).replace('-', ' ').title()
    return "Unknown Set"


def process_row(col_data, url, set_name, logger):
    """
    Processes a row of table data and constructs the corresponding NoSQL entry.

    Parameters:
        col_data (list): List of column data from a table row.
        url (str): The source URL of the data.
        set_name (str): The name of the set extracted from the URL.
        logger (logging.Logger): Logger instance for logging errors.

    Returns:
        dict or None: A dictionary representing the NoSQL entry, or None if processing fails.
    """
    try:
        filtered_col_data = col_data[2:-1]  # Adjust indices based on the table structure
        if not filtered_col_data:
            return None

        filtered_col_data.insert(0, url)  # Insert the source URL at the beginning

        source = filtered_col_data[0]
        product_name = filtered_col_data[1]
        rarity = filtered_col_data[4]
        number = filtered_col_data[5]
        price_str = filtered_col_data[6]

        # Extract set code and card number using regex
        set_code_match = re.match(r'(OP\d{2})-(\d+)', number)
        if set_code_match:
            set_code = set_code_match.group(1)  # e.g., OP01
            card_number = set_code_match.group(2)  # e.g., 064
        else:
            if "DON" in product_name or "DON" in rarity:
                set_code = "DON"
                card_number = "DON"
            else:
                set_code = "UNKNOWN"
                card_number = "UNKNOWN"

        # Convert price string to Decimal
        price = Decimal(price_str.replace('$', '').replace(',', ''))
        current_time = datetime.utcnow().isoformat()

        # Construct PK and SK
        pk = f"OnePiece#{set_code}"
        sk_base = f"CARD#{card_number}"

        # Append a UUID to the SK to ensure uniqueness
        unique_suffix = str(uuid4())[:8]  # Shortened UUID for readability
        sk = f"{sk_base}#{unique_suffix}"

        # Construct the NoSQL entry
        nosql_entry = {
            "SetID": pk,
            "SK": sk,
            "CardName": product_name,
            "SetName": set_name,
            "Rarity": rarity,
            "Price": price,
            "Source": source,
            "CreatedAt": current_time,
            "UpdatedAt": current_time
        }
        return nosql_entry
    except Exception as parse_e:
        logger.error(f"Error parsing row data from URL {url}: {parse_e}")
        return None


def scrape_url(driver, url, logger):
    """
    Scrapes a single URL for card data.

    Parameters:
        driver (webdriver.Firefox): The Selenium WebDriver instance.
        url (str): The URL to scrape.
        logger (logging.Logger): Logger instance for logging.

    Returns:
        tuple: A tuple containing a list of all_data and a list of nosql_data entries.
    """
    all_data = []
    nosql_data = []
    logger.info(f"Processing URL: {url}")
    tqdm.write(f"\nProcessing URL: {url}") 

    try:
        driver.get(url)

        # Wait until the table body is present
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME, "tcg-table-body"))
        )

        # Additional wait to ensure content loads properly
        time.sleep(2)

        table_body = driver.find_element(By.CLASS_NAME, "tcg-table-body")
        rows = table_body.find_elements(By.TAG_NAME, "tr")
        
        set_name = extract_set_name(url)

        for row in tqdm(rows, desc="  Processing Rows", leave=False):
            cols = row.find_elements(By.TAG_NAME, "td")
            col_data = [col.text.strip() for col in cols]
            nosql_entry = process_row(col_data, url, set_name, logger)
            if nosql_entry:
                # Filter and append data to match headers
                filtered_col_data = col_data[2:-1]  # Ensure this matches the headers
                filtered_col_data.insert(0, url)    # Insert the Source URL at the beginning
                all_data.append(filtered_col_data)
                nosql_data.append(nosql_entry)
    except Exception as e:
        logger.error(f"An error occurred while processing {url}: {e}")
        tqdm.write(f"  An error occurred while processing {url}: {e}")
    
    return all_data, nosql_data


def save_to_csv(all_data, headers, csv_path, logger):
    """
    Saves the scraped data to a CSV file.

    Parameters:
        all_data (list): List of lists containing the scraped table data.
        headers (list): List of column headers.
        csv_path (Path): Path to save the CSV file.
        logger (logging.Logger): Logger instance for logging.
    """
    try:
        df = pd.DataFrame(all_data, columns=headers)
        df = df.drop(columns=['Condition'])  # Drop the 'Condition' column as per original script
        df.to_csv(csv_path, index=False)
        logger.info(f"CSV data saved to {csv_path}")
    except Exception as e:
        logger.error(f"Error saving CSV data to {csv_path}: {e}")


def save_to_json(nosql_data, json_path, logger):
    """
    Saves the NoSQL data to a JSON file using the custom JSON encoder.

    Parameters:
        nosql_data (list): List of dictionaries for NoSQL entries.
        json_path (Path): Path to save the JSON file.
        logger (logging.Logger): Logger instance for logging.
    """
    try:
        with open(json_path, 'w', encoding='utf-8') as json_file:
            json.dump(nosql_data, json_file, cls=DecimalEncoder, ensure_ascii=False, indent=4)
        logger.info(f"NoSQL JSON data saved to {json_path}")
    except Exception as e:
        logger.error(f"Error saving NoSQL JSON data to {json_path}: {e}")


def initialize_data_directory():
    """
    Initializes the data directory at the root level.

    Returns:
        Path: Path object pointing to the data directory.
    """
    data_dir = Path(__file__).resolve().parent.parent / 'data'
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir


def main():
    """
    Main function to orchestrate the scraping process.
    """
    # Initialize data directory
    data_dir = initialize_data_directory()

    # Define output file paths
    csv_path = data_dir / 'tcgplayer_data.csv'
    json_path = data_dir / 'tcgplayer_nosql_data.json'
    urls_file = data_dir / 'price-guides.txt'

    # Setup logger
    log_file = Path(__file__).resolve().parent.parent / 'logs' / 'bot.log'
    log_file.parent.mkdir(parents=True, exist_ok=True)
    logger = setup_logger('bot_logger', log_file)

    # Load URLs
    try:
        urls = load_urls(urls_file, logger)
        if not urls:
            logger.error(f"No URLs found in {urls_file}. Please add URLs to scrape.")
            print(f"No URLs found in {urls_file}. Please add URLs to scrape.")
            return
    except Exception as e:
        logger.error(f"Failed to load URLs: {e}")
        print(f"Failed to load URLs: {e}")
        return

    headers = ["Source URL", "Product Name", "Printing", "Condition", "Rarity", "Number", "Market Price"]
    all_data = []
    nosql_data = []
    total_urls = len(urls)

    # Setup Selenium driver
    driver = setup_driver(headless=True)

    try:
        with tqdm(total=total_urls, desc="Processing URLs", unit="url") as url_bar:
            for url in urls:
                url_data, url_nosql = scrape_url(driver, url, logger)
                all_data.extend(url_data)
                nosql_data.extend(url_nosql)
                url_bar.update(1)
    finally:
        driver.quit()
        logger.info("WebDriver closed.")

    # Save data to CSV and JSON
    save_to_csv(all_data, headers, csv_path, logger)
    save_to_json(nosql_data, json_path, logger)

    logger.info("Data collection complete. Successfully wrote to CSV and JSON files.")

    # Print previews
    try:
        df_preview = pd.read_csv(csv_path).head()
        tqdm.write("\nData collection complete. Here's a preview of the CSV data:")
        print(df_preview)
    except Exception as e:
        logger.error(f"Error reading CSV for preview: {e}")

    try:
        json_preview = json.dumps(nosql_data[:5], cls=DecimalEncoder, indent=4)
        tqdm.write("\nHere's a preview of the NoSQL JSON data:")
        print(json_preview)
    except Exception as e:
        logger.error(f"Error creating JSON preview: {e}")


if __name__ == "__main__":
    main()
