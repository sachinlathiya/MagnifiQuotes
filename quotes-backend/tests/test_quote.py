from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest

from app.main import app
from app.models import database, quote as models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

models.Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="module")
def client():
    app.dependency_overrides[database.get_db] = lambda: TestingSessionLocal()
    yield TestClient(app)
    models.Base.metadata.drop_all(bind=engine)

def test_create_quote(client):
    response = client.post("/api/quotes/", json={"text": "Test Quote", "author": "Test Author"})
    assert response.status_code == 200
    assert response.json()["text"] == "Test Quote"
    assert response.json()["author"] == "Test Author"

def test_read_quote(client):
    response = client.post("/api/quotes/", json={"text": "Another Quote", "author": "Another Author"})
    quote_id = response.json()["id"]
    response = client.get(f"/api/quotes/{quote_id}")
    assert response.status_code == 200
    assert response.json()["text"] == "Another Quote"
    assert response.json()["author"] == "Another Author"