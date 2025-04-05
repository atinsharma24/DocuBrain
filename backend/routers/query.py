from fastapi import APIRouter, Request, HTTPException, Query
from pydantic import BaseModel
from utils.llm import ask_llama
from utils.file_reader import extract_text_from_pdf
from utils.db import get_session
from models.document import Document
from utils.embedding import get_relevant_chunks

router = APIRouter()

class QueryRequest(BaseModel):
    query: str

# 🔹 General query with full DB context
@router.post("/")
async def query_doc(request: Request):
    data = await request.json()
    user_query = data.get("query")

    if not user_query:
        raise HTTPException(status_code=400, detail="Query is required.")

    # 🔍 Use vector search to get most relevant chunks
    try:
        relevant_chunks = get_relevant_chunks(user_query, top_k=5)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding error: {e}")

    if not relevant_chunks:
        raise HTTPException(status_code=404, detail="No relevant content found.")

    # 🧠 Compose prompt with only the relevant chunks
    context = "\n\n".join(relevant_chunks)

    prompt = f"""Answer the question based on the context below.
Context:
{context}

Question: {user_query}
"""

    response = ask_llama(prompt)
    return {"answer": response}

# 🔹 Raw LLaMA query without context
@router.post("/raw")
def raw_query(req: QueryRequest):
    prompt = f"Answer the following question:\n{req.query}"
    response = ask_llama(prompt)
    return {"answer": response}

# 🔹 Ask LLaMA from a specific file
@router.post("/file")
def ask_from_file(file_path: str = Query(...), question: str = Query(...)):
    text = extract_text_from_pdf(file_path)
    full_prompt = f"{text}\n\nQuestion: {question}"
    response = ask_llama(full_prompt)
    return {"response": response}






# from fastapi import APIRouter, Request, HTTPException
# from services.llm import query_llama
# from utils.file_reader import extract_text_from_pdf
# from models.document import Document
# from utils.db import get_session
# import requests
# from pydantic import BaseModel
# from fastapi import Query
# from pydantic import BaseModel
# from utils.llm import ask_llama


# router = APIRouter()

# class QueryRequest(BaseModel):
#     query: str

# @router.post("/")
# async def query_doc(request: Request):
#     data = await request.json()
#     user_query = data["query"]

#     with get_session() as session:
#         docs = session.query(Document).all()
#         context = "\n".join([doc.content[:1000] for doc in docs if doc.content])

#     prompt = f"""Answer the question based on the context below:
#     Context: {context}
#     Question: {user_query}
#     """

#     res = requests.post("http://localhost:11434/api/generate", json={
#         "model": "llama3",
#         "prompt": prompt
#     })

#     response_text = res.json()["response"]
#     return {"answer": response_text}

# @router.post("/")
# def query_llama(req: QueryRequest):
#     if not req.question:
#         raise HTTPException(status_code=400, detail="Question is required.")
    
#     # This is the basic prompt; later we can add document context
#     prompt = f"Answer the following question:\n{req.question}"
    
#     response = ask_llama(prompt)
#     return {"answer": response}

# @router.post("/query")
# def ask_model(prompt: str):
#     answer = query_llama(prompt)
#     return {"response": answer}

# @router.post("/query-file")
# def ask_from_file(file_path: str = Query(...), question: str = Query(...)):
#     text = extract_text_from_pdf(file_path)
#     full_prompt = f"{text}\n\nQuestion: {question}"
#     response = query_llama(full_prompt)
#     return {"response": response}