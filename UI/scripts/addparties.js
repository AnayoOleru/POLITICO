
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

let sideNav = document.getElementById("mySidenav");
let openParty = document.getElementById("openparty");
let addbtn = document.getElementById("addbtn");
let editBtn = document.getElementById("edit");
let deleteParty = document.getElementById("deleteparty");
let deleteBtn = document.getElementById("delete");
let openModal = document.getElementById("openmodal");

function openNav() {
    sideNav.style.width = "200px";
}

function closeNav() {
    sideNav.style.width = "0";
}

// add party

function openLog() {
    openModal.style.display="block"
    editBtn.disabled = true;
    deleteBtn.disabled = true;
}

function closeLog() {
    openModal.style.display="none";
    editBtn.disabled = false;
    deleteBtn.disabled = false;
}

// edit party
editBtn.addEventListener("click", openEdit);
function openEdit() {
    openParty.style.display="block";
    deleteBtn.disabled = true;
    addbtn.disabled = true;
}

function closeEdit() {
    openParty.style.display="none";
    deleteBtn.disabled = false;
    addbtn.disabled = false;
}

// delete party
deleteBtn.addEventListener("click", openDelete)
function openDelete() {
    deleteParty.style.display="block";
    addbtn.disabled = true;
    editBtn.disabled = true;
}

function closeDelete() {
    deleteParty.style.display="none";
    addbtn.disabled = false;
    editBtn.disabled = false;
}


// Consuming the API
// alert("connected!");
document.getElementById('addParty').addEventListener('submit', addParty);

function addParty(e){
    e.preventDefault();

    
    let name = document.getElementById('name').value;
    let hqaddress = document.getElementById('hqaddress').value;
    let logoUrl = document.getElementById('logoURL').value;
    let result = document.getElementById('result');
    // let partyImage = document.getElementById('partyImage').value;
    // let partyName = document.getElementById('partyName').value;
    // let partyAddress = document.getElementById('partyAddress').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            name: name, 
            hqaddress: hqaddress,
            logoUrl: logoUrl
        })
        
    })
    .then((res) => {
        if(res.ok){
            responseStatus = true;
            result.innerHTML = "party successfully created";
            result.style.color="white";
        }
       return res.json()
    })
    // render the parties page
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
};

function getParties(){
    fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
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
                `<div class="col-1-of-3">
                <div class="card">
                    <div class="card__side card__side--front">
                        <div class="card__picture card__picture--1" id="partyImage">&nbsp;</div>
                        <div class="card__details">
                            <ul>
                                <li style="font-size: 30px" id="partyName">${party.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-1">
                        <div class="card__cta">
                            <div class="card__price-box">
                                <p class="card__price-only">Headquater Address</p>
                                <p class="card__price-only" id="partyAddress">${party.hqaddress}</p>
                            </div>
                            <a href="#" class="btn" id="edit">Edit</a>
                            <a href="#" class="btn" id="delete">Delete</a>
                        </div>
                    </div>
                </div>
            </div> `
            });
        document.getElementById('partyResult').innerHTML = result;
    })
    

        
}

// admin can edit political party
// function editParty(){

// }

// admin can delete political party
// function deleteParty(){

// }

getParties();

