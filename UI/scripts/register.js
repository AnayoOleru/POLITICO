// Consuming the API for votes, users hsould be able to vote
// alert("connected!");
document.getElementById('register').addEventListener('submit', userRegister);

function userRegister(e){
    e.preventDefault();

    
    let office = document.getElementById('name').value;
    let user = document.getElementById('hqaddress').value;
    let result = document.getElementById('result');
    // let partyImage = document.getElementById('partyImage').value;
    // let partyName = document.getElementById('partyName').value;
    // let partyAddress = document.getElementById('partyAddress').value;
    let responseStatus = false;


    fetch('https://trustpolitico.herokuapp.com/api/v1/office/:id/register', {
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
