from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database import get_db
from models import Document
from schemas import DocumentCreate, Document as DocumentSchema, DocumentUpdate, AdminLogin
from auth import get_current_admin, authenticate_admin

router = APIRouter(prefix="/admin", tags=["admin"])

@router.post("/login")
async def login(credentials: AdminLogin):
    token = authenticate_admin(credentials.username, credentials.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return {"access_token": token, "token_type": "bearer"}

@router.post("/docs", response_model=DocumentSchema)
async def create_document(
    doc: DocumentCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_doc = Document(
        title=doc.title,
        content=doc.content,
        parent_id=doc.parent_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

@router.put("/docs/{doc_id}", response_model=DocumentSchema)
async def update_document(
    doc_id: int,
    doc: DocumentUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_doc = db.query(Document).filter(Document.id == doc_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    for field, value in doc.dict(exclude_unset=True).items():
        setattr(db_doc, field, value)
    db_doc.updated_at = datetime.now()
    
    db.commit()
    db.refresh(db_doc)
    return db_doc
