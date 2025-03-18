-- CITYSCOUTDB database creation
DROP DATABASE IF EXISTS cityscoutdb;
CREATE DATABASE cityscoutdb;
USE cityscoutdb;

-- --------------------------------User creation--------------------------------

-- Allow access from both localhost and 127.0.0.1
DROP USER IF EXISTS 'cityscout_user'@'localhost';
DROP USER IF EXISTS 'cityscout_user'@'127.0.0.1';

-- Recreate user for both `localhost` and `127.0.0.1`
CREATE USER 'cityscout_user'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'cityscout_user'@'127.0.0.1' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON cityscoutdb.* TO 'cityscout_user'@'localhost';
GRANT ALL PRIVILEGES ON cityscoutdb.* TO 'cityscout_user'@'127.0.0.1';

FLUSH PRIVILEGES;

-- ---------------------------------Table creation--------------------------------

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    contacts JSON NOT NULL CHECK (JSON_VALID(contacts)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- --------------------------------Data insertion--------------------------------

INSERT INTO users (username, password_hash)
VALUES ('john_doe', '$2b$10$hashedpassword123');

INSERT INTO favorites (user_id, name, category, street_address, city, province, contacts)
VALUES (
    1,
    'Example Business',
    'Restaurant',
    '123 Main St',
    'Toronto',
    'Ontario',
    '{"Phone": "+1-555-123-4567", "Website": "https://example.com/"}'
);
