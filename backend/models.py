from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, ForeignKey, Index, func
)
from sqlalchemy.orm import relationship, declarative_base

# Base class for SQLAlchemy models
Base = declarative_base()

# =================== DOCUMENT MODEL ===================
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    parent_id = Column(Integer, ForeignKey('documents.id', ondelete='CASCADE'), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=False)

    # Self-referential relationship for hierarchical documents
    children = relationship(
        "Document",
        backref="parent",
        remote_side=[id],
        cascade="all, delete-orphan",
        single_parent=True
    )

    def __repr__(self):
        return f"<Document(id={self.id}, title='{self.title}')>"

# =================== ADMIN MODEL ===================
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        Index('idx_admin_username', username, unique=True),
    )

    def __repr__(self):
        return f"<Admin(id={self.id}, username='{self.username}')>"

# =================== MODULE MODEL ===================
class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    duration = Column(String(20), nullable=False)
    lessons = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    parent_id = Column(Integer, ForeignKey('modules.id', ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Self-referential relationship for hierarchical modules
    children = relationship(
        "Module",
        backref="parent",
        remote_side=[id],
        cascade="all, delete-orphan",
        single_parent=True
    )

    __table_args__ = (
        Index('idx_module_parent_id', parent_id),
        Index('idx_module_title', title),
    )

    def __repr__(self):
        return f"<Module(id={self.id}, title='{self.title}')>"
