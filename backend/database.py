import os
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from contextlib import contextmanager
from dotenv import load_dotenv  # Import dotenv to load environment variables
import traceback

# Load environment variables from the .env file
load_dotenv()

# ========================== CONFIGURE LOGGING ============================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# ========================== DATABASE URL CONFIGURATION ============================
DATABASE_URL = os.getenv("DATABASE_URL")

# If DATABASE_URL is not set, raise an error
if not DATABASE_URL:
    logger.error("DATABASE_URL environment variable is not set.")
    raise ValueError("DATABASE_URL environment variable is not set.")

# Fix SSL mode if required for PostgreSQL (Railway PostgreSQL often needs SSL)
if 'postgresql' in DATABASE_URL and 'sslmode=' not in DATABASE_URL:
    if '?' in DATABASE_URL:
        DATABASE_URL += '&sslmode=require'
    else:
        DATABASE_URL += '?sslmode=require'

# Log the structure of the URL for debugging (without sensitive details)
parsed_url = DATABASE_URL.split('@')
if len(parsed_url) > 1:
    logger.info(f"Database connection to: {parsed_url[-1]}")

# ========================== CREATE DATABASE ENGINE ============================
try:
    logger.info("Initializing database connection...")
    
    engine = create_engine(
        DATABASE_URL,
        echo=True,           # Log SQL statements for debugging
        pool_pre_ping=True,  # Enable health checks to avoid stale connections
        pool_size=5,         # Maintain 5 connections in the pool
        max_overflow=10,     # Allow up to 10 additional connections
        pool_timeout=30,     # Max wait time for a connection
        pool_recycle=1800    # Recycle connections every 30 minutes
    )

    # Test the database connection
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        logger.info("✅ Database connection test successful!")

    logger.info("Database engine created successfully.")

except Exception as e:
    logger.error("❌ Failed to create database engine.")
    logger.error(f"Error details: {str(e)}")
    logger.error(traceback.format_exc())
    raise

# ========================== SESSION FACTORY ============================
# Session factory for database interactions
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()

# ========================== DATABASE DEPENDENCY ============================
def get_db():
    """Dependency function to get a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ========================== INITIALIZE DATABASE ============================
def init_db():
    """
    Initialize the database schema.
    Creates all tables defined in models if they don't already exist.
    """
    try:
        logger.info("Initializing database schema...")
        Base.metadata.create_all(bind=engine, checkfirst=True)
        logger.info("✅ Database schema initialized successfully!")
    except SQLAlchemyError as e:
        logger.error("❌ Database error during initialization.")
        logger.error(f"Error details: {str(e)}")
        logger.error(traceback.format_exc())
        raise
    except Exception as e:
        logger.error("❌ Unexpected error during database initialization.")
        logger.error(f"Error details: {str(e)}")
        logger.error(traceback.format_exc())
        raise

# ========================== CONNECTION TEST ============================
if __name__ == "__main__":
    """
    Run this file directly to test the database connection and schema initialization.
    """
    try:
        logger.info("Testing database connection...")
        init_db()
    except Exception as e:
        logger.error("❌ Database initialization failed.")
        logger.error(f"Error details: {str(e)}")
