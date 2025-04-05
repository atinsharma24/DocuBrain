from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import file_upload, query
from sqlalchemy import create_engine
from utils.db import Base
from models.document import Document  # 🔥 Needed to register the model

# Setup DB engine
engine = create_engine("sqlite:///./db.sqlite3", connect_args={"check_same_thread": False})

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# CORS middleware (Allow all in dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(file_upload.router, prefix="/api/upload", tags=["Upload"])
app.include_router(query.router, prefix="/api/query", tags=["Query"])

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to DocuBrain API!"}
