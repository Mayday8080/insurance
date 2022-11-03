# Payment App Backend
>Nodejs backend for payment app.

## Table of contents
* [Description](#description)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [App Info](#app-info)


## Description
FinTech backend written in NodeJS, MongoDB and Express to accept payment from react native application (or from any other source).
This backend utilizes the Lipa Na M-pesa Online third party payment gateway API



It enables two main different flows or implementations:
1. Accept payments from users.
2. Admins manage and control various services.
 

Use the below login so you can access admin areas:
- Email: admin@gmail.com
- Password: 123456



## Technologies
* Technologies used:
  * `Node` 12.1 - provides the backend environment for this application
  * `Moongoose` 5.5 - Mongoose schemas to model the application data
  * `Express` 4.16 - middleware is used to handle requests, routes


## Setup
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

###  Clone repo
Run the following scripts in the terminal to clone the repo
```
$ git clone git@github.com:Mayday8080/mpesa-backend.git
$ cd mpesa-backend
```

----------------------------------

### Steps to run server
 #### 1. Setup MongoDB
 - Download and Install it from [mongodb.com](https://www.mongodb.com/try/download/community)
 
 #### 2. Get Lipa Na M-Pesa Online Credentials
 - Get Lipa Na M-Pesa test credentials from [Safaricom](https://developer.safaricom.co.ke/home)
  
 #### 3. Create .env file
- Create .env file in project folder
- Enter these lines to that:

```
DATABASE=mongodb://localhost/payments
PORT=8000
JWT_SECRET=somethingsecret
MPESA_CONSUMER_KEY=mpesaconsumerkey
MPESA_CONSUMER_SECRET=mpesaconsumersecret
MPESA_SHORT_CODE=mpesashortcode 
MPESA_PASSKEY=mpesapasskey

```
 
 #### 5. Run Server

```bash
# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Features
*  Lipa Na M-Pesa online API endpoint available at `/api/mpesa/`
*  User transactions API endpoint available at `/api/transactions/`
*  Payment Services  API endpoint available at `/api/services/`
*  Payment Charges  API endpoint available at `/api/charges/`
*  Custom user authentication using JSON Web Tokens. The API is available at `/api/auth/`
*  Simple users functionality: superuser can view the list of all users in admin panel. The relevant API endpoint is available at `/api/users/`.

## App Info

### Version

1.0.0

### License

This project is licensed under the MIT License
