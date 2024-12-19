from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Document
from schemas import Document as DocumentSchema

router = APIRouter(tags=["documents"])

@router.get("/docs/{doc_id}", response_model=DocumentSchema)
async def get_document(
    doc_id: int,
    db: Session = Depends(get_db)
):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.get("/docs", response_model=List[DocumentSchema])
async def get_documents(
    db: Session = Depends(get_db)
):
    return db.query(Document).all()
