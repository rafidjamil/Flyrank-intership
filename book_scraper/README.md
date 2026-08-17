# Polite Book Scraper

A lightweight, polite web scraper built in Python that extracts, cleans, and validates book data from 3 pages of [Books to Scrape](http://books.toscrape.com/), converting messy HTML into clean, schema-validated JSON.

## Features

- **Polite Scraping:** Includes a custom `User-Agent` header and a 1-second delay (`time.sleep(1)`) between requests to avoid overwhelming the server.
- **Data Cleaning & Type Casting:** Automatically cleans raw HTML strings:
  - Currency strings (`"£51.77"`) $\rightarrow$ `float` (`51.77`)
  - Stock availability text $\rightarrow$ `boolean` (`true`/`false`)
  - Text star ratings (`"Three"`) $\rightarrow$ `integer` (`3`)
- **Schema Validation:** Enforces strict data types and valid ranges for all extracted records using `pydantic`.
- **Fault Tolerant & Resilient:** Uses `try-except` error handling to gracefully skip broken book entries or network errors without crashing the pipeline.

## Project Structure

```text
book_scraper/
├── scraper.py     # Main Python scraping & validation script
├── books.json     # Clean, validated JSON output (60 records)
└── README.md      # Documentation
```

## Setup & Execution

### 1. Requirements

Ensure you have Python 3.8+ installed.

### 2. Install Dependencies

Install the necessary libraries:

```bash
pip install requests beautifulsoup4 pydantic
```

### 3. Run the Scraper

Execute the script from your terminal:

```bash
python scraper.py
```

## Data Schema & Output Format

Each record saved to `books.json` adheres to the following structure:

```json
{
  "title": "A Light in the Attic",
  "price": 51.77,
  "availability": true,
  "rating": 3
}
```

### Schema Rules (`Pydantic`)
- `title`: String (non-empty)
- `price`: Float ($\ge 0.0$)
- `availability`: Boolean (`true` / `false`)
- `rating`: Integer ($1$ to $5$)