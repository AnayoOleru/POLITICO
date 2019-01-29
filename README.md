[![Build Status](https://travis-ci.org/AnayoOleru/POLITICO.svg?branch=develop)](https://travis-ci.org/AnayoOleru/POLITICO)
[![Maintainability](https://api.codeclimate.com/v1/badges/ae19724fed3af03714eb/maintainability)](https://codeclimate.com/github/AnayoOleru/POLITICO/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/AnayoOleru/POLITICO/badge.svg?branch=ch-163356628-integrate-coveralls)](https://coveralls.io/github/AnayoOleru/POLITICO?branch=ch-163356628-integrate-coveralls)

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

# POLITICO
 > :ng: Politico is a web-app that enables both citizens give their mandate to politicians running for different government offices. POLITICO also enables politicians to express interest to run for an office, while building trust in the process through transparency. :slot_machine:

 # UI
https://anayooleru.github.io/POLITICO/

 ## UI Pages
 User profile: `../POLITICO/UI/parties.html`

 Politician profile: `../POLITICO/UI/politician/politician.html`

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

### Application Endpoints

| HTTP Request | End Point | Functionality |
| -------------| -----------| ----------- |
| **POST** | /parties | Create a political party |
| **GET** | /parties/:party-id | fetch a specific party |
| **GET** | /parties| fetch all political parties records |
| **PATCH** | /parties/:party-id/name |  edit the name of a specific political party |
| **DELETE** | /parties/:party-id | Delete a specific political party |
| **POST** | /offices/ | create a political office |
| **GET** | /offices/ | fetch all political offices records |
| **GET** | /offices/:office-id | fetch all political records |
| - | -|  -|
