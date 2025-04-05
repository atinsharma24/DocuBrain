import os
import requests
from utils.db import get_session
from models.document import Document

# You can later store embeddings in a vector DB. For now, we just log them.
OLLAMA_EMBED_URL = "http://localhost:11434/api/embeddings"

def get_file_content(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"[ERROR] Reading file failed: {e}")
        return None

def embed_text(text: str):
    payload = {
        "model": "llama3",
        "prompt": text
    }
    try:
        res = requests.post(OLLAMA_EMBED_URL, json=payload)
        res.raise_for_status()
        return res.json().get("embedding", [])
    except Exception as e:
        print(f"[ERROR] Embedding failed: {e}")
        return []

def process_document_embedding(doc_id: int):
    with get_session() as session:
        doc = session.query(Document).filter_by(id=doc_id).first()
        if not doc:
            print(f"[WARN] Document ID {doc_id} not found")
            return

        content = get_file_content(doc.path)
        if not content:
            return

        # Simple chunking — later use Langchain for PDFs etc
        chunks = [content[i:i+500] for i in range(0, len(content), 500)]

        all_embeddings = []
        for chunk in chunks:
            emb = embed_text(chunk)
            all_embeddings.append(emb)
            print(f"[DEBUG] Embedded chunk: {chunk[:30]}... → {len(emb)} dimensions")

        print(f"[INFO] Embedded document '{doc.filename}' with {len(all_embeddings)} chunks")
