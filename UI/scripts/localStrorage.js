class Token {

    storeUserToken(token){
        window.localStorage.setItem('userToken', token);
    }
}

export default Token;


