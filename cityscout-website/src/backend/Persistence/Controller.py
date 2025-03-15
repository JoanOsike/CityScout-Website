from flask import Flask
import mysql.connector

app = Flask(__name__)

# Configuration for the database
app.config['MYSQL_USER'] = 'adminacc'
app.config['MYSQL_PASSWORD'] = 'adminacc123'
app.config['MYSQL_DB'] = 'cs_database_name'
app.config['MYSQL_HOST'] = '127.0.0.1'

# Function to connect to the database
def get_db_connection():
    return mysql.connector.connect(
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        host=app.config['MYSQL_HOST'],
        database=app.config['MYSQL_DB']
    )

if __name__ == '__main__':
    app.run(debug=True)
