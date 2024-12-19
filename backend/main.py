from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text, inspect
from datetime import datetime
import logging
import traceback
import asyncio
from routes import admin_routes, doc_routes, module_routes
from models import Module
from schemas import ModuleResponse
from fastapi import APIRouter
from typing import List
from database import get_db, init_db, engine
from models import Document, Admin, Module
from schemas import (
    DocumentCreate, Document as DocumentSchema, DocumentUpdate,
    AdminLogin, ModuleCreate, ModuleResponse, ModuleUpdate
)
from auth import get_current_admin, authenticate_admin

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="DevOps Documentation Platform")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    try:
        logger.info("Starting application initialization...")
        
        # Initialize database with retries
        retry_count = 0
        max_retries = 3
        while retry_count < max_retries:
            try:
                init_db()
                break
            except Exception as db_error:
                retry_count += 1
                if retry_count == max_retries:
                    raise
                logger.warning(f"Database initialization attempt {retry_count} failed: {str(db_error)}")
                await asyncio.sleep(2)
        
        # Verify database state
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        logger.info(f"Available tables: {tables}")
        
        # Test database connection
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            logger.info("Database connection verified")
        
        logger.info("Application startup completed successfully")
    except Exception as e:
        logger.error(f"Application startup failed: {str(e)}")
        logger.error(traceback.format_exc())
        raise

@app.get("/")
async def root():
    return {"message": "DevOps Documentation API"}

# 5. Include routers here (MANDATORY)
app.include_router(admin_routes.router, prefix="/admin", tags=["admin"])
app.include_router(doc_routes.router, tags=["documents"])
app.include_router(module_routes.router, prefix="/modules", tags=["modules"])



# =========================== ADMIN LOGIN ===========================
@app.post("/admin/login")
async def login(credentials: AdminLogin):
    token = authenticate_admin(credentials.username, credentials.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return {"access_token": token, "token_type": "bearer"}

# =========================== DOCUMENT ENDPOINTS ===========================
@app.post("/admin/docs", response_model=DocumentSchema)
async def create_document(
    doc: DocumentCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    try:
        logger.info(f"Creating new document: {doc.title}")
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
        logger.info(f"Document created successfully: ID {db_doc.id}")
        return db_doc
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating document: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create document")

@app.get("/docs/{doc_id}", response_model=DocumentSchema)
async def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@app.get("/docs")
async def get_documents(db: Session = Depends(get_db)):
    return db.query(Document).all()

@app.put("/admin/docs/{doc_id}", response_model=DocumentSchema)
async def update_document(
    doc_id: int,
    doc: DocumentUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    try:
        db_doc = db.query(Document).filter(Document.id == doc_id).first()
        if not db_doc:
            raise HTTPException(status_code=404, detail="Document not found")
        
        for field, value in doc.dict(exclude_unset=True).items():
            setattr(db_doc, field, value)
        db_doc.updated_at = datetime.now()
        
        db.commit()
        db.refresh(db_doc)
        return db_doc
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating document: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update document")

# =========================== MODULES ENDPOINTS ===========================
router = APIRouter(tags=["modules"])
@app.get("/modules", response_model=list[ModuleResponse], tags=["modules"])
async def get_modules(db: Session = Depends(get_db)):
    return db.query(Module).all()

@app.post("/modules", response_model=ModuleResponse, tags=["modules"])
async def create_module(module: ModuleCreate, db: Session = Depends(get_db)):
    new_module = Module(**module.dict())
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module

@app.get("/modules/{module_id}", response_model=ModuleResponse, tags=["modules"])
async def get_module(module_id: int, db: Session = Depends(get_db)):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@app.put("/modules/{module_id}", response_model=ModuleResponse, tags=["modules"])
async def update_module(
    module_id: int, module_update: ModuleUpdate, db: Session = Depends(get_db)
):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    for key, value in module_update.dict(exclude_unset=True).items():
        setattr(db_module, key, value)
    db.commit()
    db.refresh(db_module)
    return db_module

@app.delete("/modules/{module_id}", tags=["modules"])
async def delete_module(module_id: int, db: Session = Depends(get_db)):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    db.delete(db_module)
    db.commit()
    return {"detail": "Module deleted successfully"}
