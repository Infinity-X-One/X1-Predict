from fastapi import APIRouter, Query
from vector_memory import query_embedding

router = APIRouter()

@router.get("/memory/search")
def memory_search(q: str = Query(..., description="Query text to search memory")):
    try:
        results = query_embedding(q)
        return {"results": results}
    except Exception as e:
        return {"error": str(e)}
