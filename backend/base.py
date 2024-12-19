from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declared_attr

class CustomBase:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    # Add common columns or methods here if needed
    id = None  # Will be defined in specific models

Base = declarative_base(cls=CustomBase)
