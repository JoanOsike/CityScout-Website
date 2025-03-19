from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI

import socket
import requests

app = Flask(__name__)
CORS(app)  #Allow requests from React frontend

# Load API Key
api_key = ""

#Expected format
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
Rules = "Ensure that you are searching the web for the results. " \
"Do not fabricate information. Prioritize real-world accuracy and provide links only if they don't give 404 not found error. Make sure to triple check a link and make sure it actually works before providing it " \
"Take information from google maps api" \
"Do not add any additional text, only provide the fields present in the format"

# Route to Receive Data from Frontend
@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    try:

        user_input = request.json
        print(" Received user input:", user_input)

        user_query = json.dumps(user_input)

        client = OpenAI(api_key=api_key)

        response2 = client.responses.create(
            model="gpt-4o-mini",
            tools=[{"type" : "web_search_preview"}],
            input=f"You are playing the part of a json-outputter. Abiding strictly to the following rules '{Rules}', provide 1-8 locations based on {user_query} and provide the output as a json of a list of locations in the matching city, strictly fitting the following format '{results_format}'."
        )
        #print("Raw OpenAI response:", response2)

        json_str = response2.output_text.split("json\n")[1].split("```")[0]

        

        def is_valid_website(url):
          try:
              # First, check if the domain exists
              domain = url.split('/')[2]  
              socket.gethostbyname(domain)  # This will fail if the domain doesn't exist

              
              response = requests.get(url, allow_redirects=True, timeout=5)

              if response.status_code not in [200, 301, 302]:
                  return False
              
              html = response.text.strip()
              if len(html) < 500:  # If page is too short, likely blank
                  return False

              return True  
          except socket.gaierror:
              print(f"DNS error: {url} is unreachable.")
              return False
          except requests.RequestException:
              return False

        def replace_invalid_websites(json_list):
          for obj in json_list:
              
              if 'Contacts' in obj and 'Website' in obj['Contacts']:
                  print('H')
                  if not is_valid_website(obj['Contacts']['Website']):
                      obj['Contacts']['Website'] = "Unavailable"
          return json_list  


        spots = replace_invalid_websites(json.loads(json_str))
        #spots = json.loads(json_str)


        print("📩 Sending response to frontend:", spots)  # Debugging
        return jsonify(spots)

    except json.JSONDecodeError:
        print(f"⚠️ JSON Error: OpenAI response is not valid JSON.\n{ai_response}")
        return jsonify({"error": "Invalid JSON response from OpenAI"}), 500
    except Exception as e:
        print(f"⚠️ Error in LLM API: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)