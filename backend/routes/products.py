import re
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from schemas import ProductSchema
from typing import List, Optional

router = APIRouter()


def format_category(raw: str) -> str:
    """
    'HomeImprovement'       → 'Home Improvement'
    'Computers&Accessories' → 'Computers & Accessories'
    'MusicalInstruments'    → 'Musical Instruments'
    """
    # Aggiunge spazio prima di ogni lettera maiuscola (camelCase/PascalCase)
    spaced = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', raw)
    # Aggiunge spazi attorno alle &
    spaced = spaced.replace('&', ' & ')
    # Normalizza spazi multipli
    return re.sub(r'\s+', ' ', spaced).strip()


@router.get("/", response_model=List[ProductSchema])
def get_products(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category:
        # Riporta la categoria al formato raw del db (rimuove spazi aggiunti)
        normalized = re.sub(r'\s*&\s*', '&', category)   # "Home & Kitchen" → "Home&Kitchen"
        normalized = normalized.replace(' ', '')           # "Home Improvement" → "HomeImprovement"
        query = query.filter(Product.category.ilike(f"{normalized}%"))
    return query.offset(skip).limit(limit).all()


@router.get("/count")
def count_products(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if category:
        normalized = re.sub(r'\s*&\s*', '&', category)
        normalized = normalized.replace(' ', '')
        query = query.filter(Product.category.ilike(f"{normalized}%"))
    return {"total": query.count()}


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    rows = db.query(Product.category).all()
    categories = set()
    for (cat,) in rows:
        if cat:
            top_level = cat.split("|")[0].strip()
            categories.add(format_category(top_level))
    return sorted(list(categories))


@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: str, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.product_id == product_id).first()