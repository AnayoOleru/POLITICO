[![Build Status](https://travis-ci.org/AnayoOleru/POLITICO.svg?branch=develop)](https://travis-ci.org/AnayoOleru/POLITICO)
[![Maintainability](https://api.codeclimate.com/v1/badges/ae19724fed3af03714eb/maintainability)](https://codeclimate.com/github/AnayoOleru/POLITICO/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/AnayoOleru/POLITICO/badge.svg?branch=ch-163356628-integrate-coveralls)](https://coveralls.io/github/AnayoOleru/POLITICO?branch=ch-163356628-integrate-coveralls)

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

# POLITICO
 > :ng: Politico is a web-app that enables both citizens give their mandate to politicians running for different government offices. POLITICO also enables politicians to express interest to run for an office, while building trust in the process through transparency. :slot_machine:

#  API Documentation
https://app.swaggerhub.com/apis-docs/Anayo-Oleru/politico/1.0

 # UI
https://anayooleru.github.io/POLITICO/

 ## UI Pages
 User profile: `../POLITICO/UI/parties.html`

 Admin: `../POLITICO/UI/admin/govOffice.html` 

 ## UI Implemented features
* Users can sign up or sign in
* Registered users can reset password
* Registered users can view political parties
* Registered users can view all politicians running for a specific government
* Registered users can vote politician
* Registered user can view history containing a list of political offices   and candidates the user has voted for
* Politician can express interest to run for a specific government office
* Politician can create a petition against a concluded election
* Admin can view and create a political party
* Admin can view and edit a political party
* Admin can delete a political party
* Admin can view and create a government office, which politicians can express interest to run for.   

## App on Heroku
https://trustpolitico.herokuapp.com/api/v1/

## Technologies Used

* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [EsLint](https://eslint.org/) - An open source project to provide a pluggable linting utility for javascript
* [Mocha](https://mochajs.org/) - A feature-rich javascript test framework running Node.js and in the browser, making asynchronous testing simple and fun, flexible and accurate reporting. 

## Installation

1. Install [`node`](https://nodejs.org/en/download/)

2. Clone the repository

    ```
    git clone https://github.com/AnayoOleru/POLITICO.git
    ```

3. Navigate to the project directory

    ```
    cd ~/path/to/POLITICO
    ```

4. Install all dependencies

    ```
    npm install
    ```

5. Start the app

    ```
    npm start dev-start
    ```

6. Run the application on browser

    ```
    http://localhost:3000/
    ```

#### Server-side tests

- Uses `Chai` and `Chai-Http`

```
    npm run test
```

## API Usage

API BASE URL https://trustpolitico.herokuapp.com/api/v1/. It's recommended to attach a `authorization` Header containing the generated `token` from `/api/auth/login` to all requests.


### Parties endpoints `/api/v1/parties`

| method | route          | description             | data                                 |
| ------ | -------------- | ----------------------- | ------------------------------------ |
| GET    | /parties         | Get all politcal parties      |
| GET    | /parties/:partyid | Get a specific political party record          |
| POST   | /parties         | Create/Add parties    | `{name, hqaddress, logoUrl}` |
| PATCH   | /parties/:partyid | Edit the name of a specific political party        |
| DELETE | /parties/:partyid | Delete a specific political party |

### Office endpoints `/api/v1/office`

| method | route            | description          | data                            |
| ------ | ---------------- | -------------------- | ------------------------------- |
| POST   | /offices/         | Create a political office | `{type, name}` |
| GET    | /offices/ | Fetch all political parties records         |
| GET    | /offices/:officeid | Fetch a specific office     |
| POST | /office/:userid/register  | Register a user as a candidate  | `{office, prt}`
| GET | /office/:officeid/result  | Collate and fetch the result of specicific office  |

### Authentication endpoints `/api/v1/auth`

| method | route        | description               | data                      |
| ------ | ------------ | ------------------------- | ------------------------- |
| POST   | /auth/login  | Sign In                   | `{email, password}`       |
| POST   | /auth/signup | Sign up or create account | `{firstname, lastname, othername, email, phonenumber, passportUrl, password}` |

### Authentication endpoints `/api/v1/votes`

| method | route        | description               | data                      |
| ------ | ------------ | ------------------------- | ------------------------- |
| POST   | /votes  | Vote for a candidate                   | `{created_by, office, candidate}`       |


```javascript

// login as admin
{
  email: "anayokyle@gmail.com",
  password: "anayokyleoleru"
}
```

