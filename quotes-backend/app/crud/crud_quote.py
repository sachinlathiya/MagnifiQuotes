from sqlalchemy.orm import Session
from app.models.quote import Quote
from app.schemas.quote import QuoteCreate

def get_quote(db: Session, quote_id: int):
    return db.query(Quote).filter(Quote.id == quote_id).first()

def get_quotes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Quote).offset(skip).limit(limit).all()

def get_quotes_by_author(db: Session, author: str, skip: int = 0, limit: int = 10):
    return db.query(Quote).filter(Quote.author == author).offset(skip).limit(limit).all()

def create_quote(db: Session, quote: QuoteCreate):
    db_quote = Quote(text=quote.text, author=quote.author)
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    return db_quote

def update_quote(db: Session, quote_id: int, updated_quote: QuoteCreate):
    db_quote = get_quote(db, quote_id)
    if db_quote is None:
        return None
    db_quote.text = updated_quote.text
    db_quote.author = updated_quote.author
    db.commit()
    db.refresh(db_quote)
    return db_quote

def delete_quote(db: Session, quote_id: int):
    db_quote = get_quote(db, quote_id)
    if db_quote is None:
        return None
    db.delete(db_quote)
    db.commit()
    return db_quote