# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Install the PostgreSQL client development package
RUN apt-get update && apt-get install -y postgresql-client libpq-dev gcc

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Run the application
CMD ["sh", "-c", "sleep 10 && uvicorn app.main:app --host 0.0.0.0 --port 8000"]