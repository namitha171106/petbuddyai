from flask import Flask, render_template, request, jsonify
import ollama

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    user_message = data["message"]
    pet = data["pet"]

    system_prompt = f"""
    You are PetBuddy AI.

    The user has selected {pet}.

    Act like a friendly pet-care expert.

    Help with:
    - food
    - health
    - grooming
    - training
    - pet behavior
    - fun facts

    Give clear and simple answers.
    """

    response = ollama.chat(
        model="phi3",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
    )

    reply = response["message"]["content"]

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)