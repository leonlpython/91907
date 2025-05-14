#from flask import Flask
from supabase import create_client, Client
from datetime import date
import os
from flask import Flask,render_template, request

app = Flask(__name__, static_folder='../src')

@app.route("/")
def index():
    return render_template('calender.html')


if __name__ == "__main__":
    app.run(debug=True)