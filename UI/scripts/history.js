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
    if(payload.exp >= payload.iat){
        console.log("Token had expired!")
        window.location.href = '/views/401.html';
        setTimeout(function(){
            window.location.href = '/views/sign-in.html'; 
        }, 30000);
    }
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
// function username(){
//     let result +=
//     `<li><a href="#" class="active">${payload.lastName}</a></li>`
//     document.getElementById('username').innerhtml = result;
// }

// username();

// consume API for results
function getOffice(){
        // fetch("http://localhost:3000/api/v1/candidates", {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-type': 'application/json',
        //         'x-access-token': token
        //     },
        // }).then((res) => res.json())
        // .then((data)=>{
        //     console.log(data);
        //     let result = '';
        //     data.data.forEach((candidate) =>{
        //         result +=
        //         ``
        //     });
        // }),

        fetch("https://trustpolitico.herokuapp.com/api/v1/offices", {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'x-access-token': token
            },
        }).then((res) => res.json())
        .then((data)=>{
            console.log(data);
            let result = '';
            data.data.forEach((office) =>{
                result +=
                `<a href="#" onclick="showResult('${office.id}', '${office.name}')"><span>${office.name}</span></a>`
            
                username =
                `<li><a href="#" class="active" style="font-size:20px;">${payload.userName} ${payload.lastName}</a></li>`

                nameside =
                `<span>${payload.userName} ${payload.lastName}</span>`
            });
            document.getElementById('mySidenav2').innerHTML = result;
            document.getElementById('username').innerHTML = username;
            document.getElementById('nameside').innerHTML = nameside;
        })
}

getOffice();

function showResult(officeId, officeSName){
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
            let nameOffice = '';
            data.data.forEach((vote) => {
                result +=
                `
                <tr>
                <td data-th="Office:">${officeSName}</td>
                <td data-th="Candidate:">${vote.candidate}</td>
                <td data-th="Result:">${vote.result}</td>
                </tr>
                `
                nameOffice =
                `<b>${officeSName}</b>`
            });
        document.getElementById('tableRow').innerHTML = result;
        document.getElementById('officename').innerHTML = nameOffice;
    })        
}
