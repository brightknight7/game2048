from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Path for high scores
SCORE_FILE = "high_scores.json"

def load_high_score():
    if os.path.exists(SCORE_FILE):
        with open(SCORE_FILE, "r") as f:
            return json.load(f)
    return {"high_score": 0}

def save_high_score(score):
    with open(SCORE_FILE, "w") as f:
        json.dump({"high_score": score}, f)

@app.route("/")
def index():
    high_score = load_high_score()["high_score"]
    return render_template("index.html", high_score=high_score)

@app.route("/update_score", methods=["POST"])
def update_score():
    current_score = request.json.get("score", 0)
    high_score = load_high_score()["high_score"]
    if current_score > high_score:
        save_high_score(current_score)
        return jsonify({"new_high_score": current_score})
    return jsonify({"new_high_score": high_score})

if __name__ == "__main__":
    app.run(debug=True)
