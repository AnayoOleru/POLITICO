// alert("connected!");
document.getElementById('loginPost').addEventListener('submit', loginPost);

function loginPost(e){
    e.preventDefault();

    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


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
    .then((res) => res.json())
    // render user dashboard
        .then((data) => {
            setTimeout(function() {
                window.location.href = '/views/parties.html';
              }, 3000);
        })
}