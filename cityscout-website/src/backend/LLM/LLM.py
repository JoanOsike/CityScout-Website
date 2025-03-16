#pip install simplerllm
#pip install python-dotenv
import json
import os

import os
from SimplerLLM.language.llm import LLM, LLMProvider
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

# For OpenAI - SimplerLLM
llm_instance = LLM.create(provider=LLMProvider.OPENAI, model_name="gpt-4o-mini")

#Normal way
print("Current Working Directory:", os.getcwd())
print("Expected Path:", os.path.abspath("apikey"))

with open('401apikey', 'r') as f:
    api_key = f.read().strip()

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

User_req = '{"Category": "cafe", "City": "Toronto" ,"Province" : "ON","Budget": "10-20", "time": "13-16"}'
Rules = "Ensure that you are searching the web for the results. Avoid fabricated information and prioritise precision and accuracy"

# Generate a response
def LLM_req(User_req):
    
    response = llm_instance.generate_response(prompt= f"Why cant you search the web? I was unbder the impression 4o-mini can search the web ")
    print(response)

def LLM_req2(User_req):

    client = OpenAI(api_key= api_key)
    response2 = client.responses.create(
        model="gpt-4o-mini",
        tools=[{"type" : "web_search_preview"}],
        input=f"You are playing the part of a json-outputter. Abiding to the following rules '{Rules}', provide 5 locations based on {User_req} and provide the output as a json of a list of locations with the following format '{results_format}'."
    )
    
    json_str = response2.output_text.split("json\n")[1].split("```")[0]
    Spots = json.loads(json_str)

    # Get format for locations class then put json into locations class to return a list of locations
    #OR,(assuming frontend shouldn't deal with class objects)
    #Simply search for places in database, if they are already favourited, and then add a favourited boolean, to the object befor returning it.
    print(Spots)

LLM_req2(User_req)