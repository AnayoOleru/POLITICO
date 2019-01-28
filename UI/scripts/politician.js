function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}





// hhhhh
//get modal element
let modal = document.getElementById("simplemodal");
//open modal by clicking button
let modalbtn = document.getElementById("modalbtn");
//close button
let closebtn = document.getElementsByClassName("closebtn") [0]; //0 indicates first class 

modalbtn.addEventListener('click', openModal); // to open modal window
closebtn.addEventListener('click', closeModal); // to close modal window by clicking close button
window.addEventListener('click', outsideClick); // to close modal window by clicking outside the modal window

function openModal()
{
    modal.style.display = "block";
}

function closeModal()
{
    modal.style.display = "none";
}

function outsideClick(e)
{
    if(e.target == modal)
    {
        modal.style.display = "none";
    }
}

let cancelbtn = document.getElementById("cancelbtn");
let cancelIcon = document.getElementById("cancelIcon");
cancelbtn.addEventListener('click', closemodal);
cancelIcon.addEventListener('click', closemodal);
function closemodal(){
    modal.style.display = 'none';
}