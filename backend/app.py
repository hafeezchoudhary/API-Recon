from flask import Flask, request, jsonify, send_file
from flask_cors import CORS 
from analyzer.postman_analyzer import analyze_collection
from analyzer.postman_analyzer import analyze_summary
from analyzer.postman_analyzer import analyze_variables
from analyzer.postman_analyzer import create_analysis
from report import generate_report
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
    analysis = create_analysis()
    analyze_collection(json_data, analysis)
    analyze_variables(json_data, analysis)
    analyze_summary(json_data, analysis)

    generate_report(analysis)

    return jsonify(analysis) 


@app.route("/download-report")
def download_report():
    return send_file("APILens_Report.pdf")


if __name__ == "__main__":
    app.run(debug=True)