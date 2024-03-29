# ChatApp

This is a ChatApp built with React Native, Expo, Node.js, and MongoDB.

## Demo Video

![ChatApp Demo](chatapp-demo.mp4)

## Installation

Clone the repository and install the dependencies.

```bash
git clone
cd chatapp
npm install
```

## Usage

First, start the server.

```bash
cd backend
npm install
npm start
```

Then, start the mobile app.

```bash
cd app-mobile
npm install
npm start
```

## Environment Variables

For the backend to work properly, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`PORT`

`JWT_SECRET_KEY`

`JWT_EXPIRE`

`JWT_COOKIE_EXPIRES_IN`

<!-- format of JWT_EXPIRE is {numbOFDay}d  -->

> Note: You can use any value for JWT_SECRET_KEY. JWT_EXPIRE is in the number of days. For example, 30d means the token will expire in 30 days. JWT_COOKIE_EXPIRES_IN is in the number of days. For example, 30 means the cookie will expire in 30 days.

For the mobile app to work properly, you will need to add the following environment variables to your .env file

`API_URL`
`WS_URL`

> Note: Your API_URL should be the same as your backend server URL. For example, if your backend server is running on localhost:5000, then your API_URL should be <http://localhost:5000/api/v1>. If localhost doesn't work, try using your IP address. For example, <http://your-ip-address:5000/api/v1> and WS_URL should be <ws://your-ip-address:5000> or <ws://localhost:5000>

## API Reference

Visit README.md in the backend folder.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
