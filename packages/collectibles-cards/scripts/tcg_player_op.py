#!/usr/bin/env python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

# Set up the Selenium WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Navigate to the URL
url = 'https://www.tcgplayer.com/categories/trading-and-collectible-card-games/one-piece-card-game/price-guides/paramount-war-pre-release-cards'
driver.get(url)

# Give time for JavaScript to load the content
time.sleep(5)

# Locate the table wrapper element by class name (adjust based on your inspection)
table = driver.find_element(By.CLASS_NAME, 'table-wrapper')

# Print the table HTML (or process it further)
print(table.get_attribute('innerHTML'))

# Close the browser
driver.quit()
