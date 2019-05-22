let token = window.localStorage.getItem('token');
let payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken(){
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
    // admin shouldn't be able to acess this page
    if(payload.isAdmin == true){
        window.location.href = '/views/sign-in.html';
    }
    // check if token has expired

}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
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

            // username =
                // `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`

                // nameside =
                // `<span>${payload.userName} ${payload.lastName}</span>`
            });
        document.getElementById('partyResult').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    })
    

        
}

UserGetParties();
