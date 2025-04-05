from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import file_upload, query
from routers import file_upload, query
from utils.db import create_db

app = FastAPI()

create_db()  # 🔥 create tables on startup

# Allow all for dev; tighten later in prod
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

@app.get("/")
def root():
    return {"message": "Welcome to DocuBrain API!"}
