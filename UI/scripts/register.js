// import { promises } from "fs";

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
}


// sidenav
let sideNav = document.getElementById("mySidenav");

function openNav() {
    sideNav.style.width = "250px";
}

function closeNav() {
    sideNav.style.width = "0";
}


function getAll(){
    
Promise.all([
    fetch("https://trustpolitico.herokuapp.com/api/v1/users", {
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
            data.data.forEach((user) => {
                result +=
                `
                <option id=${user.id}>${user.firstname} ${user.lastname}</option> `

            });

        document.getElementById('users').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    }),
    fetch("https://trustpolitico.herokuapp.com/api/v1/parties", {
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
            data.data.forEach((party) => {
                result +=
                `
                <option id=${party.id}>${party.name}</option> `
            });
        document.getElementById('parties').innerHTML = result;
    }),
    fetch("https://trustpolitico.herokuapp.com/api/v1/offices", {
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
            `
            <option id=${office.id}>${office.name}</option> `
        });
    document.getElementById('offices').innerHTML = result;
        })
    ]);
}
getAll();


// alert('connected!');
// function getAllUsers(){
//     fetch('http://localhost:3000/api/v1/users', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((user) => {
//                 result +=
//                 `
//                 <option id=${user.id}>${user.firstname} ${user.lastname}</option> `
            
//                 username =
//                 `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`

//                 nameside =
//                 `<span>${payload.userName} ${payload.lastName}</span>`

//             });

//         document.getElementById('users').innerHTML = result;
//         document.getElementById('username').innerHTML = username;
//         document.getElementById('nameside').innerHTML = nameside;
//     })
        
// }


// function getAllParties(){
//     fetch('http://localhost:3000/api/v1/parties', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((party) => {
//                 result +=
//                 `
//                 <option id=${party.id}>${party.name}</option> `
//             });
//         document.getElementById('parties').innerHTML = result;
//     })
    

        
// }

// function getAllOffice(){
//     fetch('http://localhost:3000/api/v1/offices', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((office) => {
//                 result +=
//                 `
//                 <option id=${office.id}>${office.name}</option> `
//             });
//         document.getElementById('offices').innerHTML = result;
//     })
    

        
// };


document.getElementById('regBtn').addEventListener('click', register);
console.log('gggg')

function register(e){
    e.preventDefault();

   let userValue = document.getElementById('users');
   let partyValue = document.getElementById('parties');
   let officeValue = document.getElementById('offices');
   let userId = userValue.options[userValue.selectedIndex].id;
   let userName = userValue.options[userValue.selectedIndex].value;
   let partyId = partyValue.options[partyValue.selectedIndex].id;
   let partyName = partyValue.options[partyValue.selectedIndex].value;
   let officeId = officeValue.options[officeValue.selectedIndex].id;
   let officeName = officeValue.options[officeValue.selectedIndex].value;
   let result = document.getElementById('result');
//    console.log(userRegisterValue, partyRegisterValue, officeRegisterValue);

   let responseStatus = false;


    fetch(`https://trustpolitico.herokuapp.com/api/v1/office/${userId}/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            office: officeId,
            officeName:officeName, 
            party: partyId,
            partyName: partyName,
            candidate: userId,
            candidateName: userName
        })
        
    })
    .then((res) => {
        if(res.ok){
            responseStatus = true;
            result.innerHTML = "Candidate successfully registered";
            result.style.color="green";
        }
        console.log(res);
       return res.json()
    })
    // render the parties page
    .then((res) => {
        console.log(res);
        if(!responseStatus){
            result.innerHTML = res.error;
            result.style.color="red";
        } 
        if(res.data[0].user.isadmin == true){
            window.location.href = '/views/signin.html';
            }
    })
};

// getAllUsers()
// getAllParties()
// getAllOffice()
