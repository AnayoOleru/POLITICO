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


