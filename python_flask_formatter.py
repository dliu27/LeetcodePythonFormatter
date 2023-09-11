#!/usr/bin/env python3.8

from flask import Flask, request, jsonify
import autopep8
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print("running")

@app.route('/format', methods=['GET', 'POST'])
def format_code():
    if request.method == 'GET':
        return {"success": "/format service is running"}

    elif request.method == 'POST':
        try:
            data = request.json
            code = str(data.get('code', ''))

            formatted_code = autopep8.fix_code(code)

            response = {
                'formatted_code': formatted_code
            }
            return jsonify(response), 200  # Return a success status code
        except Exception as e:
            error_message = str(e)
            return jsonify({'error': error_message}), 400  # Return a client error status code
