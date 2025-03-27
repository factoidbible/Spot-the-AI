from flask import Flask, jsonify
from replit import db

app = Flask(__name__)

# Initialize visit count
if "visits" not in db:
    db["visits"] = 0

@app.route('/')
def home():
    db["visits"] += 1
    return jsonify({"visits": db["visits"]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
