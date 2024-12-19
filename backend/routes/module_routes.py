from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database import get_db
from models import Module
from schemas import ModuleCreate, ModuleResponse, ModuleUpdate

router = APIRouter(prefix="/modules", tags=["modules"])

# ====================== MODULE ROUTES ======================

# Get all modules
@router.get("/", response_model=List[ModuleResponse])
async def get_modules(db: Session = Depends(get_db)):
    return db.query(Module).all()

# Create a new module
@router.post("/", response_model=ModuleResponse)
async def create_module(module: ModuleCreate, db: Session = Depends(get_db)):
    new_module = Module(**module.dict(), created_at=datetime.now(), updated_at=datetime.now())
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module

# Get a specific module
@router.get("/{module_id}", response_model=ModuleResponse)
async def get_module(module_id: int, db: Session = Depends(get_db)):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

# Update a module
@router.put("/{module_id}", response_model=ModuleResponse)
async def update_module(module_id: int, module_update: ModuleUpdate, db: Session = Depends(get_db)):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    for key, value in module_update.dict(exclude_unset=True).items():
        setattr(db_module, key, value)
    db_module.updated_at = datetime.now()
    db.commit()
    db.refresh(db_module)
    return db_module

# Delete a module
@router.delete("/{module_id}")
async def delete_module(module_id: int, db: Session = Depends(get_db)):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    db.delete(db_module)
    db.commit()
    return {"detail": "Module deleted successfully"}
