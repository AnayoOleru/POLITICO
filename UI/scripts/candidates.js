let token = window.localStorage.getItem('token');
function verifyToken(){
    console.log('Reached');
    // alert('connected!');
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let voted = document.getElementById("voted");
function voteColor(){
    voted.style.backgroundColor = "green";
    voted.style.color = "#ffffff";
}


// users get all candidates
function getAllCandidates(){
    fetch('https://trustpolitico.herokuapp.com/api/v1/candidates', {
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
            data.data.forEach((candidate, user) => {
                result +=
                
            `
            <div class="col-1-of-3">
                        <div class="card">
                <div class="card__side card__side--front">
                 <div class="card__picture card__picture--1">&nbsp;</div>
                <h4 class="card__heading">
            <span class="card__heading-span card__heading-span--1">${candidate.officename}</span>
            </h4>
            <div class="card__details">
               <ul>
            <li style="font-size: 25px">${candidate.candidatename}</li>
            </ul>
            </div>
             </div>
            <div class="card__side card__side--back card__side--back-1">
             <div class="card__cta">
             <div class="card__price-box">
            <p class="card__price-only">${candidate.partyname}</p>
            <p class="card__price-value">${candidate.candidatename}</p>
              </div>
            <a href="#" class="btn">Vote</a>
                </div>
                    </div>
                        </div>
                `
            });
        document.getElementById('candidatescard').innerHTML = result;
    })
    

        
}

getAllCandidates();
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
