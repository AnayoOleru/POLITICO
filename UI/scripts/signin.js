// alert("connected!");
document.getElementById('loginPost').addEventListener('submit', loginPost);

function loginPost(e){
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let result = document.getElementById('result');
    let responseStatus = false;


    fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email, 
            password: password
        })
        
    })
    
    // render user dashboard
    .then((res) => {
        if(res.ok){
            responseStatus = true;
        }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if(!responseStatus){
            result.innerHTML = res.error;
        }
        if(res.data[0].user.isadmin == true){
        window.localStorage.setItem('token', res.data.token);
        window.location.href = '/views/govOffice.html';
        }else{
        window.localStorage.setItem('token', res.data.token);
        window.location.href = '/views/parties.html';
        }
    })
}