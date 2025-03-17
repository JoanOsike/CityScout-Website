from db_connection import get_db_connection

#Singleton class for user authentication

class UserAuth:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(UserAuth, cls).__new__(cls)
            cls._instance.connection = get_db_connection()
            cls._instance.cursor = cls._instance.connection.cursor(dictionary=True)
        return cls._instance

    def signup(self, username, password):
        #Handle user signup
        try:
            self.cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            if self.cursor.fetchone():
                return {"error": "User already exists"}, 409

            self.cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
            self.connection.commit()
            return {"message": "Account created successfully"}, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def login(self, username, password):
        #Handle user login
        try:
            self.cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = self.cursor.fetchone()
            if not user:
                return {"error": "Invalid credentials"}, 401

            return {"message": f"Welcome back, {username}!"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    def __del__(self):
        #Close the connection when the instance is deleted
        if self.connection.is_connected():
            self.cursor.close()
            self.connection.close()
