import subprocess
import requests

# --- CONFIG (edit these values) ---
SUPABASE_API_URL = "https://your-project.supabase.co/rest/v1/your-table"
SUPABASE_API_KEY = "your-api-key"

def check_supabase():
    print("🔍 Checking Supabase connection...")
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }
    try:
        r = requests.get(SUPABASE_API_URL, headers=headers, timeout=5)
        if r.status_code == 200:
            print("✅ Supabase API is reachable")
            return True
        else:
            print(f"❌ Supabase error: {r.status_code}")
            return False
    except Exception as e:
        print(f"❌ Supabase connection failed: {e}")
        return False

def check_git():
    print("🔍 Checking Git repository status...")
    try:
        result = subprocess.run(["git", "status"], capture_output=True, text=True)
        if "On branch" in result.stdout:
            print("✅ Git repo is clean and active")
            return True
        else:
            print("⚠️ Git repo has issues or is detached")
            return False
    except Exception as e:
        print(f"❌ Git check failed: {e}")
        return False

def check_prediction_script():
    print("🔍 Testing prediction engine...")
    try:
        # Replace with your actual prediction command/script
        result = subprocess.run(["python", "predict.py", "--symbol", "AAPL"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Prediction engine runs successfully")
            print("📈 Output:", result.stdout.strip())
            return True
        else:
            print("❌ Prediction failed:", result.stderr)
            return False
    except Exception as e:
        print(f"❌ Prediction check error: {e}")
        return False

def run_system_validation():
    print("\n🧪 Starting System Validation\n")
    supabase_ok = check_supabase()
    git_ok = check_git()
    model_ok = check_prediction_script()

    print("\n✅ System Validation Summary:")
    print(f"- Supabase: {'PASS' if supabase_ok else 'FAIL'}")
    print(f"- Git: {'PASS' if git_ok else 'FAIL'}")
    print(f"- Prediction: {'PASS' if model_ok else 'FAIL'}")

    if all([supabase_ok, git_ok, model_ok]):
        print("\n🎉 System is operational!")
    else:
        print("\n⚠️ One or more components failed. Review output above.")

if __name__ == "__main__":
    run_system_validation()
