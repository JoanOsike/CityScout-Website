import mysql.connector
from mysql.connector import Error

def get_db_connection():
    """Create and return a database connection."""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='adminacc',
            password='adminacc123',
            database='your_database_name'
        )
        return connection
    except Error as e:
        raise Exception(f"Database connection failed: {e}")
