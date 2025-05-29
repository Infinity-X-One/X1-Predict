# loop_route.py

from fastapi import APIRouter
import subprocess

router = APIRouter()

@router.post("/loop")
def run_loop():
    try:
        output = subprocess.run(["python", "main.py"], capture_output=True, text=True, timeout=30)
        return {
            "status": "success",
            "output": output.stdout
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
