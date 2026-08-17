import time
import json
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel, Field, ValidationError

HEADERS = {
    'User-Agent': 'PoliteStudentScraper/1.0 (Learning Project; contact: student@example.com)'
}

BASE_URL = "http://books.toscrape.com/catalogue/page-{}.html"


RATING_MAP = {
    "One": 1,
    "Two": 2,
    "Three": 3,
    "Four": 4,
    "Five": 5
}


class BookSchema(BaseModel):
    title: str = Field(..., min_length=1)
    price: float = Field(..., ge=0.0)
    availability: bool
    rating: int = Field(..., ge=1, le=5)



def scrape_books(total_pages=3):
    all_books = []
    
    for page in range(1, total_pages + 1):
        url = BASE_URL.format(page)
        print(f"[+] Scraping Page {page}/{total_pages}: {url}")
        
        try:
            
            time.sleep(1)
            
            response = requests.get(url, headers=HEADERS, timeout=10)
            
            if response.status_code != 200:
                print(f"  [-] Warning: Page {page} returned status code {response.status_code}. Skipping page.")
                continue
            
            soup = BeautifulSoup(response.text, 'html.parser')
            book_elements = soup.select('article.product_pod')
            
            print(f"  [i] Found {len(book_elements)} books on page {page}.")
            
            for index, book in enumerate(book_elements, 1):
                try:
                    # A. Title Extract karna
                    title = book.h3.a['title']
                    
                    # B. Price Clean karna ("£51.77" -> 51.77)
                    raw_price = book.select_one('.price_color').text
                    clean_price = float(raw_price.replace('£', '').replace('Â', '').strip())
                    
                    # C. Availability Convert karna
                    stock_text = book.select_one('.availability').text.strip()
                    in_stock = "In stock" in stock_text
                    
                    # D. Rating Parse karna ("star-rating Three" -> 3)
                    rating_classes = book.select_one('.star-rating')['class']
                    rating_text = [cls for cls in rating_classes if cls != 'star-rating'][0]
                    rating_num = RATING_MAP.get(rating_text, 0)
                    
                    # Raw Record
                    raw_record = {
                        "title": title,
                        "price": clean_price,
                        "availability": in_stock,
                        "rating": rating_num
                    }
                    
                    # E. Schema Validation Check
                    validated_record = BookSchema(**raw_record)
                    all_books.append(validated_record.model_dump())
                    
                except (ValidationError, KeyError, AttributeError, ValueError) as err:
                    # Agar koi single book entry broken ho, crash na ho balkay skip kar de
                    print(f"  [!] Skipped broken book at index {index}: {err}")
                    continue

        except requests.RequestException as req_err:
            # Agar network failure ya page crash ho jaye
            print(f"  [!] Network error on page {page}: {req_err}. Moving to next...")
            continue

    return all_books



if __name__ == "__main__":
    print("--- Starting Polite Book Scraper ---\n")
    
    scraped_results = scrape_books(total_pages=3)
    
    # Save to clean JSON file
    output_filename = "books.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(scraped_results, f, indent=2, ensure_ascii=False)
        
    print(f"\n[✓] Done! Successfully extracted & validated {len(scraped_results)} records.")
    print(f"[✓] Data saved to '{output_filename}'.")