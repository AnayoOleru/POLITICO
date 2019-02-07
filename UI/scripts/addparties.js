// import swal from 'sweetalert';

function verifyToken(){
    let token = window.localStorage.getItem('token');
    // let admin = token.isadmin;

    // if(!admin){
    //     window.location.href = '/views/sign-in.html';
    // }
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
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
            'Content-type': 'application/json'
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
        }
       return res.json()
    })
    // render the parties page
    .then((res) => {
        console.log(res);
        if(!responseStatus){
            result.innerHTML = res.error;
        }
    })
}

