let token = window.localStorage.getItem('token');
let payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken(){
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
    // admin should not be able to acess user personal page
    if(payload.isAdmin == true){
        window.location.href = '/views/sign-in.html';
    }
    // check if token has expired
}


let open = document.getElementById("mySidenav");
let open2 = document.getElementById("mySidenav2");

function openNav() {
    open.style.width = "200px";
}

function closeNav() {
    open.style.width = "0";
    
}

function openNav2() {
    open2.style.width = "200px";
}

function closeNav2() {
    open2.style.width = "0";
}


// username
function username(){
    let result = `<li><a href="#" class="active">${payload.lastName}</a></li>`
    document.getElementById('username').innerhtml = result;
}

username();

// consume API for results
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
                `<a href="#" onclick="showResult('${office.id}')"><span>${office.name}</span></a>`
            });
        document.getElementById('mySidenav2').innerHTML = result;
    })
}

getOffice();

function showResult(officeId){
    console.log(officeId);
    fetch(`https://trustpolitico.herokuapp.com/api/v1/office/${officeId}/result`, {
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
            data.data.forEach((vote) => {
                result +=
                `
                <tr>
                <td data-th="Office:">${vote.office}</td>
                <td data-th="Candidate:">${vote.candidate}</td>
                <td data-th="Result:">${vote.result}</td>
                </tr>
                `
            });
        document.getElementById('tableRow').innerHTML = result;
    })
    

        
}
