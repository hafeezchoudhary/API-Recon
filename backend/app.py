from flask import Flask, request, jsonify
from flask_cors import CORS
import json

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
    bytes_data = uploaded_file.read() 
    json_text = bytes_data.decode("utf-8")
    json_data = json.loads(json_text) 
    if uploaded_file :
        return jsonify({
            "message": f"{uploaded_file.filename}",
            "collection_name": f"{json_data["info"]["name"]}",
        })

if __name__ == "__main__":
    app.run(debug=True)