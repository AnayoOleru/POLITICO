
let token = window.localStorage.getItem('token');
function verifyToken(){
    console.log('Reached');
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
    // if(res.data[0].user.isadmin == false){
    //     window.location.href = '/views/sign-in.html';
    // }
    
}

// Add modal
let openModal = document.getElementById("openmodal");
function openAdd() {
    openModal.style.display = "block";
}

function closeAdd() {
    openModal.style.display = "none";
}

// menu
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// Consuming the API admin to get all political offices
document.getElementById('addOffice').addEventListener('submit', addOffice);

function addOffice(e){
    e.preventDefault();

    
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let result = document.getElementById('result');
    let responseStatus = false;


    fetch('http://localhost:3000/api/v1/offices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            type: type, 
            name: name
        })
        
    })
    .then((res) => {
        console.log(res)
        if(res.ok){
            responseStatus = true;
            result.innerHTML = "Office successfully created";
            result.style.color="white";
        }
       return res.json()
    })
    //Only admin can access the route
    .then((res) => {
        console.log(res);
        if(!responseStatus){
            result.innerHTML = res.error;
            result.style.color="White";
        } 
        if(res.data[0].user.isadmin == true){
            window.location.href = '/views/signin.html';
            }
    })
}



// Consuming the API to get a specific Party
// alert("connected!");
document.getElementById('addOffice').addEventListener('submit', addOffice);

function addOffice(e){
    e.preventDefault();

    
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let result = document.getElementById('result').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type: type, 
            name: name
        })
        
    })
    .then((res) => {
        console.log(res)
        if(res.ok){
            responseStatus = true;
        }
       return res.json()
    })
    // render the office page
        .then((res) => {
            if(!responseStatus){
                result.innerHTML = res.error;
            }
        })
}

// Consuming the API for users to edit a specific party
// alert("connected!");
document.getElementById('partEdit').addEventListener('submit', partEdit);

function partyEdit(e){
    e.preventDefault();

    
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let result = document.getElementById('result').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type: type, 
            name: name
        })
        
    })
    .then((res) => {
        console.log(res)
        if(res.ok){
            responseStatus = true;
        }
       return res.json()
    })
    // render the office page
        .then((res) => {
            if(!responseStatus){
                result.innerHTML = res.error;
            }
        })
}


// Consuming the API for admin to delete a specific political party
// alert("connected!");
document.getElementById('partyDelete').addEventListener('submit', partyDelete);

function partyDelete(e){
    e.preventDefault();

    
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let result = document.getElementById('result').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type: type, 
            name: name
        })
        
    })
    .then((res) => {
        console.log(res)
        if(res.ok){
            responseStatus = true;
        }
       return res.json()
    })
    // render the office page
        .then((res) => {
            if(!responseStatus){
                result.innerHTML = res.error;
            }
        })
}