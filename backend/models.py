from sqlalchemy import Column, String, Float, Text
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "products"

    product_id = Column(String, primary_key=True)
    product_name = Column(String)
    category = Column(String)
    discounted_price = Column(String)
    actual_price = Column(String)
    discount_percentage = Column(String)
    rating = Column(Float)
    rating_count = Column(String)
    about_product = Column(Text)
    img_link = Column(String)
    product_link = Column(String)

class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(String, primary_key=True)
    product_id = Column(String)
    user_id = Column(String)
    user_name = Column(String)
    review_title = Column(String)
    review_content = Column(Text)