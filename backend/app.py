from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from . import database
from . import models
from .routes import admin_routes, doc_routes

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="DevOps Documentation Platform")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
database.init_db()

# Register routes
app.include_router(admin_routes.router)
app.include_router(doc_routes.router)

@app.get("/")
async def root():
    return {"message": "DevOps Documentation API"}
