from flask import Flask, request, jsonify
from auth import UserAuth

app = Flask(__name__)

@app.route('/signup', methods=['POST'])
def signup():
    #API endpoint for user signup
    data = request.json
    username = data.get('username')
    password = data.get('password')

    auth = UserAuth()
    response, status = auth.signup(username, password)
    return jsonify(response), status


@app.route('/login', methods=['POST'])
def login():
    #API endpoint for user login
    data = request.json
    username = data.get('username')
    password = data.get('password')

    auth = UserAuth()
    response, status = auth.login(username, password)
    return jsonify(response), status


if __name__ == '__main__':
    app.run(debug=True)
