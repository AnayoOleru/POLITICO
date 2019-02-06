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


// Consuming the API
// alert("connected!");
document.getElementById('addOffice').addEventListener('submit', addOffice);

function addOffice(e){
    e.preventDefault();

    
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;


    fetch('http://localhost:3000/api/v1/offices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type: type, 
            name: name
        })
        
    })
    .then((res) => res.json())
    // render the office page
        .then((data) => console.log(data))
}
