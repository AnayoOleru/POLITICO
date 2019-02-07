
// alert("connected!");
document.getElementById('addpost').addEventListener('submit', addPost);

function addPost(e){
    e.preventDefault();

    
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let othername = document.getElementById('othername').value;
    let email = document.getElementById('email').value;
    let phonenumber = document.getElementById('phone').value;
    let passportUrl = document.getElementById('file').value;
    let password = document.getElementById('password').value;
    let result = document.getElementById('result');
    let responseStatus = false;
    console.log('hhhhhh')


    fetch('https://trustpolitico.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            passportUrl: passportUrl, 
            firstname: firstname, 
            lastname: lastname,
            othername: othername,
            email: email,
            phonenumber: phonenumber,
            password: password
        })
        
    })
    .then((res) => {
        if(res.ok){
            responseStatus = true;
            result.innerHTML = "Signup successful!"
            result.style.color="green"
        }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if(!responseStatus){
            result.innerHTML = res.error;
            // setTimeout(function() {
            //     result.innerHTML = "";
            //   }, 7000);
        }else{

        window.localStorage.setItem('token', res.data[0].token);
        window.location.href = '/views/parties.html';
        // console.log(res);
        }
    })
}