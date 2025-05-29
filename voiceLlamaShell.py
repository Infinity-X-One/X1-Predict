import subprocess
import speech_recognition as sr
import pyttsx3

def ask_llama(prompt):
    result = subprocess.run(
        ["ollama", "run", "llama2"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    return result.stdout.decode("utf-8")

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎙️ Say something...")
        audio = r.listen(source)
    try:
        text = r.recognize_google(audio)
        print(f"🧠 You said: {text}")
        return text
    except sr.UnknownValueError:
        print("😕 I didn't understand.")
        return None

def run_voice_loop():
    while True:
        query = listen()
        if query:
            print("🤖 Asking LLaMA2...")
            answer = ask_llama(query)
            print("🗣️ Answer:", answer)
            speak(answer)

if __name__ == "__main__":
    run_voice_loop()
