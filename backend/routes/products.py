from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from schemas import ProductSchema
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
def get_products(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category:
        normalized = category.replace(" & ", "&")
        sample = db.query(Product.category).filter(
            Product.category.ilike(f"{normalized}%")
        ).first()
        query = query.filter(Product.category.ilike(f"{normalized}%"))
    return query.offset(skip).limit(limit).all()

@router.get("/count") 
def count_products(db: Session = Depends(get_db)):
    return { "total": db.query(Product).count() }

@router.get("/categories")
def get_categories(db:Session = Depends(get_db)):
    rows = db.query(Product.category).all()
    categories = set()
    for (cat,) in rows:
            if cat:
                top_level = cat.split("|")[0].strip()
                formatted = top_level.replace("&", " & ")
                categories.add(formatted)
    return sorted(list(categories))
    
@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: str, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.product_id == product_id).first()