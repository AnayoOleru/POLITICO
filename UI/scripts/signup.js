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


    fetch('http://localhost:3000/api/v1/auth/signup', {
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
    .then((res) => res.json())
        .then((res) => {
            setTimeout(function() {
                window.location.href = '/views/parties.html';
              }, 3000);
           
        })
}