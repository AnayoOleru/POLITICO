function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let voted = document.getElementById("voted");
function voteColor(){
    voted.style.backgroundColor = "green";
    voted.style.color = "#ffffff";
}