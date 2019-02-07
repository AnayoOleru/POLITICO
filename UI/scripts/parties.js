function verifyToken(){
    let token = window.localStorage.getItem('token');
    // let admin = token.isadmin;

    // if(!admin){
    //     window.location.href = '/views/sign-in.html';
    // }
    if(!token){
        window.location.href = '/views/sign-in.html';
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// 
let templateContainer = document.getElementById('card');
const template = (partyArray) => {
    let template = ' ';
    partyArray.forEach((element) =>{
        template += `
                <div class="col-1-of-3">
                    <div class="card">
                        <div class="card__side card__side--front">
                            <div class="card__picture card__picture--1" id="img">&nbsp;${element.logoUrl}</div>
                            <div class="card__details">
                                <ul>
                                    <li style="font-size: 30px" id="name">${element.name} </li>
                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
    return template;
}

// Consuming the API for parties, users should be able to get all parties
// alert("connected!");
// document.getElementById('allparties').addEventListener('submit', allParties);

const getParties = () => {


    fetch('https://localhost:3000/api/v1/parties')
        // method: 'POST',
        // headers: {
        //     'Accept': 'application/json, text/plain, */*',
        //     'Content-type': 'application/json',
        //     'Authorisation': `x-access-token ${token}`
        // },
        .then(res => res.json())
        .then((data) => {
            const template = partyTemplate(data);
            templateContainer.innerHTML = template;

        })

        getParties();
}
