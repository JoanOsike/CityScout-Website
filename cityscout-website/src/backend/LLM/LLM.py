#pip install simplerllm
#pip install python-dotenv
import json

import os
from SimplerLLM.language.llm import LLM, LLMProvider
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

# For OpenAI - SimplerLLM
llm_instance = LLM.create(provider=LLMProvider.OPENAI, model_name="gpt-4o-mini")

#Normal way
with open('apikey', 'r') as f:
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
