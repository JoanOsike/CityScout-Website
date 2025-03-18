# Getting Frontend Started

## Available Scripts

you can run by:

### `cd cityscout-website`
### `npm start`

when you haven't install node modules, react-router-dom, or react-select:

### `cd cityscout-website`
### `npm install` (if missing node modules)
### `npm install react-router-dom`
### `npm install react-select`
### `npm start`

if you npm start but get localhost 3000 is taken,,,:

### `open command prompt`
### `netstat -ano | findstr :3000`
then you will see
### `TCP   0.0.0.0:3000    0.0.0.0:0    LISTENING    [the numbers you see from the result you got after for ex.12345]`
then do:
### `taskkill /PID 12345 /F`
`
notes: you don't need to push Package-lock.json, package.json or readme.md

# Getting Backend Started

First, you need to set up the database

### Open MySQL Workbench
### Pick a connection you already have e.g root
### Open a query tab and copy the contents of the file sql.sql in the backend folder
### Run by hitting the lightning bolt, it should run with no errors

to run, open a terminal separate from the frontend:

### `cd cityscout-website`
### `cd src`
### `cd backend`
### `npm install mysql2 bcrypt express dotenv jsonwebtoken cors` (only if haven't already installed)
### `node server.js`
