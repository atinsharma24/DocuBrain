from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from datetime import datetime
from utils.embedding import store_document_chunks

from services.embedding import process_document_embedding
from utils.file_reader import extract_text_from_pdf
from models.document import Document
from utils.db import get_session

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# store_document_chunks(str(new_doc.id), text_content)

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())

    content = extract_text_from_pdf(file_path)

    doc = Document(
        filename=file.filename,
        upload_time=datetime.now(),
        path=file_path,
        content=content
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


# from fastapi import APIRouter, UploadFile, File
# from fastapi.responses import JSONResponse
# import os
# from datetime import datetime
# from services.embedding import process_document_embedding
# from utils.file_reader import extract_text_from_pdf
# from models.document import Document
# from utils.db import get_session
# import fitz  # PyMuPDF



# router = APIRouter()

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# def extract_text_from_pdf(path):
#     doc = fitz.open(path)
#     text = "\n".join([page.get_text() for page in doc])
#     doc.close()
#     return text


# @router.post("/")
# async def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
    
#     with open(file_path, "wb") as f:
#         f.write(await file.read())

#     content = extract_text_from_pdf(file_path)

#     text = extract_text_from_pdf(file_path)
#     doc = Document(
#         filename=file.filename,
#         upload_time=datetime.now(),
#         path=file_path,
#         content=text
#     )
    
#     with get_session() as session:
#         session.add(doc)
#         session.commit()
#         session.refresh(doc)

#     process_document_embedding(doc.id)

#     return JSONResponse(content={
#         "id": doc.id,
#         "filename": doc.filename,
#         "timestamp": doc.upload_time.isoformat()
#     })
