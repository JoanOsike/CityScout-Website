# Getting Started with Create React App

## Available Scripts

you can run by:

### `cd cityscout-website`

### `cd src` skip this part if it works without it

### `npm start`
when you haven't install node modules:

### `cd cityscout-website`
### `npm install`
### `cd src` skip this part if it works without it
### `npm start`

when you haven't install react-router-dom and react-select:

### `cd cityscout-website`
### `npm install react-router-dom`
### `npm install react-select`
### `cd src` skip this part if it works without it
### `npm start`

when you npm start but got localhost 3000 is taken,,,:

### `open command prompt`
### `netstat -ano | findstr :3000`
then you will see
### `TCP   0.0.0.0:3000    0.0.0.0:0    LISTENING    [the numbers you see from the result you got after for ex.12345]`
then do:
### `taskkill /PID 12345 /F`
`
notes: you don't need to push Package-lock.json, package.json or readme.md