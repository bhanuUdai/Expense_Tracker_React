import firebase_admin
from firebase_admin import credentials
import os

def initialize_firebase():
    if not firebase_admin._apps: 
        try:
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            cred = credentials.Certificate(os.path.join(BASE_DIR, "expense_tracker/configs", "expense_tracker.json"))
            firebase_admin.initialize_app(cred)
        except Exception as e:
            print("Error initializing Firebase:", str(e))