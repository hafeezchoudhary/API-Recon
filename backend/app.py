from flask import Flask, request, flash, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/") 
def home() :

    return {
        "status": "running",
        "message": "APILens Backend is running successfully!"
    }

@app.route("/upload", methods=["GET", "POST"])
def upload() :
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400      

    uploaded_file = request.files["file"] 
    if uploaded_file :
        return {
            "message": f"{uploaded_file.name}"
        }  

if __name__ == "__main__":
    app.run(debug=True)