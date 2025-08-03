from flask import Flask, jsonify, request
from flask_cors import CORS
from cv_processor import extract_text
import os
import time
from flask import send_file

app = Flask(__name__)
CORS(app)



@app.route('/get_file', methods=['GET'])
def get_file():
    file_path = request.args.get('path')
    if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
    return send_file(file_path, as_attachment=False)

@app.route('/filter_cvs', methods=['POST'])
def filter_cvs():
    start_time = time.time()
    data = request.json
    skill = data.get('skill', '').lower()
    folder_path = data.get('folderPath', '')

    if not folder_path:
        return jsonify({"error": "Please select a folder first"}), 400

    if not os.path.isdir(folder_path):
        return jsonify({"error": "The selected path is not a valid directory"}), 400

    matches = []
    try:
        for filename in os.listdir(folder_path):
            if filename.lower().endswith(('.pdf', '.docx', '.txt')):
                file_path = os.path.join(folder_path, filename)
                try:
                    text = extract_text(file_path)
                    if skill and skill in text.lower():
                        matches.append(filename)
                except Exception as e:
                    print(f"Error processing {filename}: {str(e)}")
                    continue

        return jsonify({
            "results": matches,
            "processing_time": round(time.time() - start_time, 2)
        })

    except Exception as e:
        return jsonify({"error": f"Processing error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)