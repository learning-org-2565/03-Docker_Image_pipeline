from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

# ================== DOCUMENT SCHEMAS ==================

class DocumentBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    content: str
    content_type: str = "rich_text"
    parent_id: Optional[int] = None
    order_index: Optional[int] = 0

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: Optional[str] = None
    content: Optional[str] = None
    content_type: Optional[str] = None
    parent_id: Optional[int] = None
    order_index: Optional[int] = None

class Document(DocumentBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
    updated_at: datetime
    children: list["Document"] = []  # For nested document structure

# ================== ADMIN LOGIN ==================

class AdminLogin(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    username: str
    password: str

# ================== MODULE SCHEMAS ==================

# Schema for creating a new module
class ModuleCreate(BaseModel):
    title: str
    duration: str
    lessons: str
    content: str
    image_url: Optional[str] = None

# Schema for updating a module (partial updates)
class ModuleUpdate(BaseModel):
    title: Optional[str] = None
    duration: Optional[str] = None
    lessons: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None

# Schema for responding with module data
class ModuleResponse(ModuleCreate):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
