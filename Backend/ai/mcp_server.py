import sys
import json
import csv

products_file = "products.csv"

def get_average_market():
    with open(products_file, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        prices = [float(row['price']) for row in reader]
        return sum(prices) / len(prices) if prices else 0

def main():
    data = json.load(sys.stdin)
    average_market = get_average_market()
    recommended_sale_price = average_market * 1.1  # 10% higher for uniqueness
    output = {
        "average_market": round(average_market, 2),
        "recommended_sale_price": round(recommended_sale_price, 2)
    }
    print(json.dumps(output))

if __name__ == "__main__":
    main()
