let token = window.localStorage.getItem('token');
let payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken(){
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
    // only admin can acess this page
    if(payload.isAdmin == false){
        window.location.href = '/views/sign-in.html';
    }
    // check if token has expired
    if(payload.exp >= payload.iat){
        console.log("Token had expired!")
        window.location.href = '/views/401.html';
        setTimeout(function(){
            window.location.href = '/views/sign-in.html'; 
        }, 30000);
    }
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


    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
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



function getOffice(){
    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let result = '';
            data.data.forEach((office) => {
                result +=
                `<div class="box box2">
                <p class="type">${office.type}</p>
                <p class="people">${office.name}</p>
        </div> `

        username =
                `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`

                nameside =
                `<span> ${payload.userName} ${payload.lastName}</span>`
            });
        document.getElementById('officeResult').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    })
    

        
}

getOffice();
