from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from datetime import datetime
from services.embedding import process_document_embedding

from models.document import Document
from utils.db import get_session

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())

    doc = Document(
        filename=file.filename,
        upload_time=datetime.now(),
        path=file_path
    )
    
    with get_session() as session:
        session.add(doc)
        session.commit()
        session.refresh(doc)

    process_document_embedding(doc.id)

    return JSONResponse(content={
        "id": doc.id,
        "filename": doc.filename,
        "timestamp": doc.upload_time.isoformat()
    })
