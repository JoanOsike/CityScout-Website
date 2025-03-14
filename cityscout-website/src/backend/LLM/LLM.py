#pip install simplerllm
#pip install python-dotenv


import os
from SimplerLLM.language.llm import LLM, LLMProvider
from dotenv import load_dotenv
load_dotenv()

# For OpenAI
llm_instance = LLM.create(provider=LLMProvider.OPENAI, model_name="gpt-3.5-turbo")

# For Google Gemini
#llm_instance = LLM.create(provider=LLMProvider.GEMINI, model_name="gemini-1.5-flash")

# For Anthropic Claude
#llm_instance = LLM.create(provider=LLMProvider.ANTHROPIC, model_name="claude-3-5-sonnet-20240620")

# For Ollama (Local Model)
#llm_instance = LLM.create(provider=LLMProvider.OLLAMA, model_name="phi")

# Generate a response
response = llm_instance.generate_response(prompt="generate a 5 words sentence")
print(response)