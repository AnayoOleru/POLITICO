let token = window.localStorage.getItem('token');
let payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken(){
    // check if no token
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
    // only admin can access this page
    if(payload.isAdmin == true){
        window.location.href = '/views/sign-in.html';
    }
    // check if token has expired
    if(payload.iat >= payload.exp){
        console.log("Token had expired!")
        window.location.href = '/views/401.html';
        setTimeout(function(){
            window.location.href = '/views/sign-in.html'; 
        }, 30000);
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
            data.data.forEach((candidate) => {
                result +=
                
            `
            <div class="col-1-of-3">
                        <div class="card">
                <div class="card__side card__side--front">
                 <div class="card__picture card__picture--1">&nbsp;</div>
                <h4 class="card__heading">
            <span class="card__heading-span card__heading-span--1" id=${candidate.candidateid}>${candidate.officename}</span>
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
              <a href="#" class="btn" onClick="vote('${candidate.office}', '${candidate.officename}', '${candidate.candidateid}', '${candidate.candidatename}')">Vote</a>
                </div>
                    </div>
                        </div>
                `
            });
            
       document.getElementById('candidatescard').innerHTML = result;
        
    })        
}

getAllCandidates();

function vote(office, officeName, candidateId, candidateName){
    console.log(payload.lastName);

    fetch('https://trustpolitico.herokuapp.com/api/v1/votes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            created_by: payload.id, 
            userName: payload.lastName,
            office: office,
            officeName: officeName,
            candidate: candidateId,
            candidateName: candidateName
        })
        
    })
    .then((res) => {
        if(res.ok){
            responseStatus = true;
            //  document.querySelectorAll('.btn').style.background-color : "red";
        }
       return res.json()
    })
    // .then((res) => {
    //     console.log(res);
    //     if(!responseStatus){
     
    //     }else{
    //     }
    // })
}
