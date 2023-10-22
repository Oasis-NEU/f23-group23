import openai
import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

#how to fix this flask error
API_KEY = open("key.txt", "r").read()
openai.api_key = API_KEY

app = Flask(__name__)
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)

# convo = [
#         {"role": "system", "content": "You are a mental health chatbot that will assist with answering mental health questions"},
#         {"role": "user", "content": "I am feeling sad today"}
#     ]

@app.route('/openai/chat', methods=['POST'])
@cross_origin(origin="*")
def add_response():
    convo = request.get_json()

    print(convo)
    convo.insert(0, {
        "role": "system", 
        "content": "You are a mental health chatbot that will assist with answering mental health questions.  Limit the response to a maximum of 4 sentences"
        })
    # convo = json.loads(convo)
    assistant_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages= convo
    )

    assistant_response =  assistant_response['choices'][0]['message']['content'].strip("\n").strip()
    return jsonify(assistant_response)


#  c:\users\alexa\appdata\local\programs\python\python39-32\lib\site-packages (from click>=8.1.3->flask) (0.4.6)
@app.route('/test', methods=['GET'])
def test():
    return "working"

