from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # ✅ Allow requests from React frontend

# ✅ Load API Key
api_key = ""

# ✅ Expected JSON format
results_format = {
    "Name": "Example Business",
    "Category": "Restaurant",
    "Street Address": "123 Main St",
    "City": "Toronto",
    "Province": "Ontario",
    "Contacts": {
        "Phone": "+1-555-123-4567",
        "Website": "https://example.com"
    }
}

# ✅ Route to Receive Data from Frontend
@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    try:
        # ✅ Get user input from frontend
        user_input = request.json
        print("📥 Received user input:", user_input)  # Debugging

        # ✅ Convert input to JSON string format for OpenAI request
        user_query = json.dumps(user_input)

        client = OpenAI(api_key=api_key)

        response2 = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a JSON output generator. Follow these rules strictly: Ensure that you are searching by preferrably google maps for the results. Avoid fabricated information and prioritize precision and accuracy."
                },
                {
                    "role": "user",
                    "content": f"Provide 1 to 3 real-world locations based on this request: {user_query}."
                               f"Format the output as a JSON list using this structure: {json.dumps(results_format)}."
                }
            ]
        )

        #  Extract response text
        ai_response = response2.choices[0].message.content.strip()

        # Remove Markdown formatting from OpenAI response
        if ai_response.startswith("```json"):
            ai_response = ai_response[7:]  
        if ai_response.endswith("```"):
            ai_response = ai_response[:-3]  

        # Convert OpenAI response to JSON
        spots = json.loads(ai_response)

        print("📩 Sending response to frontend:", spots)  # Debugging
        return jsonify(spots)

    except json.JSONDecodeError as e:
        print(f"⚠️ JSON Error: OpenAI response is not valid JSON.\n{ai_response}")
        return jsonify({"error": "Invalid JSON response from OpenAI"}), 500
    except Exception as e:
        print(f"⚠️ Error in LLM API: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
