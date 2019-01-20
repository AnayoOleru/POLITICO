function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// add party
let openModal = document.getElementById("openmodal");
function openLog() {
    openModal.style.display="block";
}

function closeLog() {
    openModal.style.display="none";
}

// edit party
let openParty = document.getElementById("openparty");
let deleteParty = document.getElementById("deleteparty");
function openEdit() {
    openParty.style.display="block";
}

function closeEdit() {
    openParty.style.display="none";
}

// delete party
function openDelete() {
    deleteParty.style.display="block";
}

function closeDelete() {
    deleteParty.style.display="none";
}


