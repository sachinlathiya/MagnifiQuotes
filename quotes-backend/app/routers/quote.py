from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.models import database
from app.models.quote import Quote
from app.schemas.quote import Quote as QuoteSchema, QuoteCreate
from app.crud import crud_quote

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=QuoteSchema)
def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    return crud_quote.create_quote(db=db, quote=quote)

@router.get("/{quote_id}", response_model=QuoteSchema)
def read_quote(quote_id: int, db: Session = Depends(get_db)):
    db_quote = crud_quote.get_quote(db, quote_id=quote_id)
    if db_quote is None:
        raise HTTPException(status_code=404, detail="Quote not found")
    return db_quote

@router.put("/{quote_id}", response_model=QuoteSchema)
def update_quote(quote_id: int, quote: QuoteCreate, db: Session = Depends(get_db)):
    db_quote = crud_quote.update_quote(db, quote_id=quote_id, updated_quote=quote)
    if db_quote is None:
        raise HTTPException(status_code=404, detail="Quote not found")
    return db_quote

@router.delete("/{quote_id}", response_model=QuoteSchema)
def delete_quote(quote_id: int, db: Session = Depends(get_db)):
    db_quote = crud_quote.delete_quote(db, quote_id=quote_id)
    if db_quote is None:
        raise HTTPException(status_code=404, detail="Quote not found")
    return db_quote

@router.get("/", response_model=List[QuoteSchema])
def read_quotes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    quotes = crud_quote.get_quotes(db, skip=skip, limit=limit)
    return quotes

@router.get("/author/{author}", response_model=List[QuoteSchema])
def read_quotes_by_author(author: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    quotes = crud_quote.get_quotes_by_author(db, author=author, skip=skip, limit=limit)
    return quotes