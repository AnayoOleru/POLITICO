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

// Consuming the API for votes, users hsould be able to vote
// alert("connected!");
document.getElementById('vote').addEventListener('submit', vote);

function Vote(e){
    e.preventDefault();

    
    let office = document.getElementById('name').value;
    let candidate = document.getElementById('hqaddress').value;
    let voter = document.getElementById('logoURL').value;
    let result = document.getElementById('result');
    // let partyImage = document.getElementById('partyImage').value;
    // let partyName = document.getElementById('partyName').value;
    // let partyAddress = document.getElementById('partyAddress').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/votes', {
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
        }else{
            // swal("Here's the title!", "...and here's the text!");
        // window.localStorage.setItem('token', res.data.token);
        // window.location.href = '/views/parties.html';
        }
    })
}
