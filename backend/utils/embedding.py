import chromadb
from chromadb.utils.embedding_functions import OllamaEmbeddingFunction

# Init Chroma with Ollama embedding
embedding_fn = OllamaEmbeddingFunction(model_name="nomic-embed-text")  # this runs via Ollama
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection("docubrain", embedding_function=embedding_fn)

def chunk_text(text: str, chunk_size=500, overlap=50):
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunks.append(text[i:i+chunk_size])
    return chunks

def store_document_chunks(doc_id: str, text: str):
    chunks = chunk_text(text)
    for idx, chunk in enumerate(chunks):
        collection.add(
            documents=[chunk],
            ids=[f"{doc_id}-{idx}"],
            metadatas=[{"doc_id": doc_id, "chunk": idx}]
        )

def get_relevant_chunks(query: str, top_k=3):
    results = collection.query(query_texts=[query], n_results=top_k)
    return results["documents"][0]
