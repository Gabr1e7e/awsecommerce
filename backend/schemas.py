from pydantic import BaseModel
from typing import Optional

class ProductSchema(BaseModel):
    product_id: str
    product_name: str
    category: str
    discounted_price: str
    actual_price: str
    discount_percentage: str
    rating: Optional[float]
    rating_count: str
    about_product: str
    img_link: str
    product_link: str

    class Config:
        from_attributes = True

class ReviewSchema(BaseModel):
    review_id: str
    product_id: str
    user_id: str
    user_name: str
    review_title: str
    review_content: str

    class Config:
        from_attributes = True