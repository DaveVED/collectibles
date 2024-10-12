#!/usr/bin/env python
import requests
import xml.etree.ElementTree as ET

# Fetch the sitemap XML
url = "https://www.tcgplayer.com/sitemap/one-piece-card-game.0.xml"
response = requests.get(url)
sitemap_xml = response.content

# Parse the XML content
root = ET.fromstring(sitemap_xml)

# Extract all URLs that contain 'price-guides'
price_guide_urls = []
for url in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
    if 'price-guides' in url.text:
        price_guide_urls.append(url.text)

# Print the list of price guide URLs
for guide_url in price_guide_urls:
    print(guide_url)
