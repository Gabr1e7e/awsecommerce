import pandas as pd
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, engine
from models import Base, Product, Review

Base.metadata.create_all(bind=engine)

df = pd.read_csv(os.path.join(os.path.dirname(__file__), "amazon.csv"))
df = df.dropna(subset=["product_id"])
df = df.drop_duplicates(subset=["product_id"])

db = SessionLocal()

print("Importando prodotti...")
for _, row in df.iterrows():
    product = Product(
        product_id=str(row["product_id"]),
        product_name=str(row.get("product_name", "")),
        category=str(row.get("category", "")),
        discounted_price=str(row.get("discounted_price", "")),
        actual_price=str(row.get("actual_price", "")),
        discount_percentage=str(row.get("discount_percentage", "")),
        rating=float(str(row["rating"]).replace(",", ".")) if pd.notna(row.get("rating")) and str(row.get("rating")).replace(".", "").replace(",", "").isdigit() else None,
        rating_count=str(row.get("rating_count", "")),
        about_product=str(row.get("about_product", "")),
        img_link=str(row.get("img_link", "")),
        product_link=str(row.get("product_link", ""))
    )
    db.merge(product)

print("Importando recensioni...")
recensioni_viste = set()

for _, row in df.iterrows():
    user_ids = str(row.get("user_id", "")).split(",")
    user_names = str(row.get("user_name", "")).split(",")
    review_ids = str(row.get("review_id", "")).split(",")
    review_titles = str(row.get("review_title", "")).split(",")
    review_contents = str(row.get("review_content", "")).split(",")

    for i, review_id in enumerate(review_ids):
        review_id = review_id.strip()
        if not review_id or review_id in recensioni_viste:
            continue
        recensioni_viste.add(review_id)
        review = Review(
            review_id=review_id,
            product_id=str(row["product_id"]),
            user_id=user_ids[i].strip() if i < len(user_ids) else "",
            user_name=user_names[i].strip() if i < len(user_names) else "",
            review_title=review_titles[i].strip() if i < len(review_titles) else "",
            review_content=review_contents[i].strip() if i < len(review_contents) else ""
        )
        db.add(review)

db.commit()
db.close()
print("Import completato!")
