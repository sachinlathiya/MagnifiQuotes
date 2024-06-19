# Quotes Editor App

This is a simple quotes editor app built with a React frontend, a FastAPI backend, and a PostgreSQL database. The application allows you to create, read, update, and delete quotes.

## Requirements

- Docker
- Docker Compose

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sachinlathiya/MagnifiQuotes.git
cd MagnifiQuotes
```

### 2.Create Environment File

Create a .env file inside the quotes-backend directory:

```bash
DATABASE_URL=postgresql://user:password@db/quotesdb
```

Create a .env file inside the quotes-frontend directory:

```bash
REACT_APP_API_URL=http://localhost:8000/api/quotes/
```

### 3.Build and Run the Application

Use Docker Compose to build and run the application:

```bash
docker-compose up --build
```

The backend will be available at http://localhost:8000 and the frontend at http://localhost:3000.

##Backend
###Backend Endpoints

    POST /quotes - Create a new quote
    GET /quotes/{quote_id} - Get a specific quote
    PUT /quotes/{quote_id} - Update a specific quote
    DELETE /quotes/{quote_id} - Delete a specific quote
    GET /quotes - Get all quotes
    GET /quotes?author={author_name} - Get all quotes by a specific author

##Frontend

The frontend provides a simple UI to interact with the backend API, allowing you to add, edit, and delete quotes.

##Testing
To run tests for the backend, use:

```bash
cd quotes-backend
pytest
```
