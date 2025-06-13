from flask import Flask
from supabase import create_client
from flask_socketio import SocketIO

SUPABASE_URL = "https://ryodxxtnkpgnoqrrvpfo.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5b2R4eHRua3Bnbm9xcnJ2cGZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTU0NDAzOCwiZXhwIjoyMDYxMTIwMDM4fQ.y-HiwHEFCarJsKpQwW3xBRRShPWmJcUqtjj5mcxST3Y"

app = Flask(__name__,static_folder='../client/build', static_url_path='',template_folder='../client/build')#, static_folder='../client/build', static_url_path=''
try:
    db = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Connected!")
except:
    raise ConnectionError("Could not connect to database")

"""
print("===============================")
response = db.table("info").select("*").execute()
print(response)
print("============================")"""
#--File Splitting
import src.webpages
import src.delete
import src.deleteolddates
import src.insertdata

if __name__ == '__main__':
     app.run(debug=True)

