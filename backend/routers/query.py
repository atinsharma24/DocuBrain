from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def query_example():
    return {"message": "Query route working!"}
