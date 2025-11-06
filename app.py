from flask import Flask, request, jsonify, send_from_directory
import csv
import subprocess
import os

app = Flask(__name__, static_folder="static")

"""Load CSV Data"""
csv_path = os.path.join('public', 'yec_competition_dataset.csv')
grocery_data = []

try:
    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        grocery_data = [row for row in reader]
    print(f"✅ Loaded {len(grocery_data)} grocery items from CSV")
except Exception as e:
    print(f"❌ Error loading CSV: {e}")


"""Helper Function"""
def get_price_info(item_name):
    items = [row for row in grocery_data if item_name.lower() in row["item_name"].lower()]
    if not items:
        return ""
    store_prices = {}
    for row in items:
        store = row["store"].title()
        try:
            price = float(row["current_price"])
        except:
            continue
        store_prices.setdefault(store, []).append(price)
    if not store_prices:
        return ""
    averages = {store: sum(prices)/len(prices) for store, prices in store_prices.items()}
    best_store, best_price = sorted(averages.items(), key=lambda x: x[1])[0]
    lines = [f"{store}: ${price:.2f}" for store, price in sorted(averages.items(), key=lambda x: x[1])]
    return f"**Prices for {item_name}:**\n" + "\n".join(lines) + f"\n🏆 Best deal: {best_store} at ${best_price:.2f}"


def ollama_chat(prompt, model="llama3"):
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=60
        )
        return result.stdout.strip()
    except:
        return "⚠️ Error talking to Ollama."


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "").strip()
    if not message:
        return jsonify({"error": "Empty message"}), 400

    # Add grocery context if user mentions an item
    relevant_info = ""
    for row in grocery_data[:50]:
        name = row["item_name"].lower()
        if name in message.lower():
            relevant_info = get_price_info(name)
            break

    system_prompt = (
        "You are BudgetBuddy, a friendly grocery assistant. "
        "Give casual, helpful answers. Include price info if relevant, information only based on 3 stores, which are Walmart, costco and loblaws."
    )
    prompt = f"{system_prompt}\n\nUser: {message}\n{relevant_info}\nAssistant:"

    reply = ollama_chat(prompt)
    return jsonify({"reply": reply})


@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    print("🚀 BudgetBuddy running at http://127.0.0.1:5000")
    app.run(debug=True)
