import os
from logging.config import fileConfig
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import pool
from alembic import context
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env file
load_dotenv()

# Load configuration from alembic.ini
config = context.config

# Configure logging
if config.config_file_name:
    fileConfig(config.config_file_name)

# Import your models here
from models import Base  # Ensure this matches your model imports

# ================== DATABASE CONFIGURATION ====================
# Load DATABASE_URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, poolclass=pool.NullPool)

# ================== RUN MIGRATIONS ====================
def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=Base.metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=Base.metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
