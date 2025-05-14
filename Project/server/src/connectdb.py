from supabase import create_client, Client
from datetime import date
import os
from __main__ import app

@app.route('/connect', methods=['GET'])
def connect_db(SUPABASE_URL,SUPABASE_KEY):
    try:
        supabase= create_client(SUPABASE_URL, SUPABASE_KEY)
    except:
        raise ConnectionError("Could not connect to database")
    return f"Connected"

SUPABASE_URL = "https://ryodxxtnkpgnoqrrvpfo.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5b2R4eHRua3Bnbm9xcnJ2cGZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTU0NDAzOCwiZXhwIjoyMDYxMTIwMDM4fQ.y-HiwHEFCarJsKpQwW3xBRRShPWmJcUqtjj5mcxST3Y"
