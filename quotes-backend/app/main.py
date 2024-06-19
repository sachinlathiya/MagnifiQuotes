from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import database, quote as models
from app.routers import quote as quote_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

app.include_router(quote_router.router, prefix="/api/quotes", tags=["quotes"])