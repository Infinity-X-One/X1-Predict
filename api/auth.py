from fastapi import Header, HTTPException
import os
import jwt
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header.")

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
        return payload
    except Exception as e:
        raise HTTPException(status_code=403, detail=f"Invalid token: {str(e)}")
