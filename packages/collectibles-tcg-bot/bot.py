#!/usr/bin/env python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time
from tqdm import tqdm 
from datetime import datetime
import json
import re

firefox_options = Options()
firefox_options.add_argument("--headless")

driver = webdriver.Firefox(options=firefox_options)

urls = [
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/romance-dawn",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/paramount-war",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/pillars-of-strength",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/kingdoms-of-intrigue",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/awakening-of-the-new-era",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/wings-of-the-captain",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/500-years-in-the-future",
    "https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/two-legends"
]

all_data = []
nosql_data = []
total_urls = len(urls)

# Function to extract set name from URL
def extract_set_name(url):
    match = re.search(r'/price-guides/([^/]+)', url)
    if match:
        return match.group(1).replace('-', ' ').title()
    return "Unknown Set"

with tqdm(total=total_urls, desc="Processing URLs", unit="url") as url_bar:
    for idx, url in enumerate(urls):
        tqdm.write(f"\nProcessing URL {idx + 1} of {total_urls}: {url}") 
        try:
            driver.get(url)

            # Wait until the table body is present
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CLASS_NAME, "tcg-table-body"))
            )

            time.sleep(2)

            table_body = driver.find_element(By.CLASS_NAME, "tcg-table-body")
            rows = table_body.find_elements(By.TAG_NAME, "tr")
            
            set_name = extract_set_name(url)

            for row_idx, row in enumerate(tqdm(rows, desc="  Processing Rows", leave=False), start=1):
                cols = row.find_elements(By.TAG_NAME, "td")
                col_data = [col.text.strip() for col in cols]
                filtered_col_data = col_data[2:-1]
                if filtered_col_data:
                    filtered_col_data.insert(0, url) 
                    all_data.append(filtered_col_data)
                    
                    try:
                        product_name = filtered_col_data[1]
                        rarity = filtered_col_data[4]
                        number = filtered_col_data[5]
                        price_str = filtered_col_data[6]
                        set_code_match = re.match(r'(OP\d{2})-(\d+)', number)
                        if set_code_match:
                            set_code = set_code_match.group(1)  # e.g., OP01
                            card_number = set_code_match.group(2)  # e.g., 064
                        else:
                            set_code = "UNKNOWN"
                            card_number = "UNKNOWN"

                        price = float(price_str.replace('$', '').replace(',', ''))
                        current_time = datetime.utcnow().isoformat()

                        # Construct PK and SK
                        pk = f"OnePiece#{set_code}"
                        sk = f"CARD#{card_number}"

                        nosql_entry = {
                            "PK": pk,
                            "SK": sk,
                            "CardName": product_name,
                            "SetName": set_name,
                            "Rarity": rarity,
                            "Price": price,
                            "CreatedAt": current_time,
                            "UpdatedAt": current_time
                        }
                        nosql_data.append(nosql_entry)
                    except Exception as parse_e:
                        tqdm.write(f"    Error parsing row {row_idx}: {parse_e}")
                        continue

        except Exception as e:
            tqdm.write(f"  An error occurred while processing {url}: {e}")
            pass

        url_bar.update(1)

        # Wait for 12 seconds before processing the next URL, except after the last one
        if idx < total_urls - 1:
            tqdm.write("  Waiting for 12 seconds before processing the next URL...")
            time.sleep(12)

driver.quit()

['https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/two-legends', 'Zou', 'Foil', 'Near Mint', 'Rare', 'OP08-039', '$0.11']
headers = ["Source URL", "Product Name", "Printing", "Condition", "Rarity", "Number", "Market Price"]
print(all_data)
df = pd.DataFrame(all_data, columns=headers)
df = df.drop(columns=['Condition'])
df.to_csv('tcgplayer_data.csv', index=False)

with open('tcgplayer_nosql_data.json', 'w', encoding='utf-8') as json_file:
    print("bing bong")
    json.dump(nosql_data, json_file, ensure_ascii=False, indent=4)

tqdm.write("\nData collection complete. Here's a preview of the CSV data:")
print(df.head())

tqdm.write("\nHere's a preview of the NoSQL JSON data:")
print(json.dumps(nosql_data[:5], indent=4))
