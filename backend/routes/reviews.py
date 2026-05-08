from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Review
from schemas import ReviewSchema
from typing import List

router = APIRouter()

@router.get("/{product_id}", response_model=List[ReviewSchema])
def get_reviews(product_id: str, db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.product_id == product_id).all()