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

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// Consuming the API for parties, users should be able to get all parties

function UserGetParties(){
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
                </div>
            </div> `
            });
        document.getElementById('partyResult').innerHTML = result;
    })
    

        
}

UserGetParties();
