const token = window.localStorage.getItem('token');
const payload = JSON.parse(window.atob(token.split('.')[1]));

function verifyToken() {
  if (!token) {
    window.location.href = '/views/sign-in.html';
  }
  // check if user is not an admin
  if (payload.isAdmin == false) {
    window.location.href = '/views/sign-in.html';
  }
}


const sideNav = document.getElementById('mySidenav');
const openParty = document.getElementById('openparty');
const addbtn = document.getElementById('addbtn');
const editBtn = document.getElementById('edit');
const deleteParty = document.getElementById('deleteparty');
const deleteBtn = document.getElementById('delete');
const openModal = document.getElementById('openmodal');

function openNav() {
  sideNav.style.width = '250px';
}

function closeNav() {
  sideNav.style.width = '0';
}

// add party

function openLog() {
  openModal.style.display = 'block';
  editBtn.disabled = true;
  deleteBtn.disabled = true;
}

function closeLog() {
  openModal.style.display = 'none';
  editBtn.disabled = false;
  deleteBtn.disabled = false;
}

// delete party
// deleteBtn.addEventListener("click", openDelete)
function openDelete() {
  deleteParty.style.display = 'block';
  addbtn.disabled = true;
  editBtn.disabled = true;
}

function closeDelete() {
  deleteParty.style.display = 'none';
  addbtn.disabled = false;
  editBtn.disabled = false;
}

// consuming API
// admin can create party
document.getElementById('addParty').addEventListener('submit', addParty);

function addParty(e) {
  e.preventDefault();


  const name = document.getElementById('name').value;
  const hqaddress = document.getElementById('hqaddress').value;
  const logoUrl = document.getElementById('logoURL').value;
  const result = document.getElementById('result');
  let responseStatus = false;


  fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({
      name,
      hqaddress,
      logoUrl,
    }),

  })
    .then((res) => {
      if (res.ok) {
        responseStatus = true;
        result.innerHTML = 'party successfully created';
        result.style.color = 'white';
      }
      return res.json();
    })
    // render the parties page
    .then((res) => {
      console.log(res);
      if (!responseStatus) {
        result.innerHTML = res.error;
        result.style.color = 'White';
      }
      if (res.data[0].user.isadmin == true) {
        window.location.href = '/views/signin.html';
      }
    });
}

function getParties() {
  fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      let result = '';
      data.data.forEach((party) => {
        result
                += `<div class="col-1-of-3">
                <div class="card">
                    <div class="card__side card__side--front">
                        <div class="card__picture card__picture--1" id="partyImage">&nbsp;</div>
                        <div class="card__details">
                            <ul>
                                <li style="font-size: 30px" class="partyId" id=${party.id}>${party.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-1">
                        <div class="card__cta">
                            <div class="card__price-box">
                                <p class="card__price-only">Headquater Address</p>
                                <p class="card__price-only" id="partyAddress">${party.hqaddress}</p>
                            </div>
                            <a href="#" class="btn" id="edit" onclick="openEdit('${party.id}')">Edit</a>
                            <a href="#" class="btn" id="delete" onclick="openDelete()">Delete</a>
                        </div>
                    </div>
                </div>
            </div> `;

        username =                `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`;

        nameside =                `<span>${payload.userName} ${payload.lastName}</span>`;
      });
      document.getElementById('partyResult').innerHTML = result;
      document.getElementById('username').innerHTML = username;
      document.getElementById('nameside').innerHTML = nameside;
    });
}

getParties();

function openEdit(party) {
  openParty.style.display = 'block';
  openParty.dataset.partyId = party;
  addbtn.disabled = true;
}


function closeEdit() {
  openParty.style.display = 'none';
  deleteBtn.disabled = false;
  addbtn.disabled = false;
}
let responseStatus = false;
const result = document.getElementById('result');

function editSubmit() {
  const Id = openParty.dataset.partyId;
  const name = document.getElementById('editvalue').value;

  fetch(`https://trustpolitico.herokuapp.com/api/v1/parties/${Id}/name`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({
      name,
    }),

  })
    .then((res) => {
      if (res.ok) {
        responseStatus = true;
        delResult.innerHTML = 'Candidate name had changed';
        delResult.style.color = 'white';
        closeEdit();
      }
      return res.json();
    })
    // render the parties page
    .then((res) => {
      console.log(res);
      if (!responseStatus) {
        delResult.innerHTML = res.error;
        delResult.style.color = 'red';
      }
      if (payload.isadmin == false) {
        window.location.href = '/views/signin.html';
      }
    });
}

// delete party
let delResult = document.getElementById('delResult');

function deleteGo() {
  const Id = openParty.dataset.partyId;

  fetch(`https://trustpolitico.herokuapp.com/api/v1/parties/${Id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  })
    .then((res) => {
      if (res.ok) {
        responseStatus = true;
        result.innerHTML = 'Candidate name had changed';
        result.style.color = 'green';
        closeEdit();
      }
      console.log(res);
      return res.json();
    })
    // render the parties page
    .then((res) => {
      console.log(res);
      if (!responseStatus) {
        result.innerHTML = res.error;
        result.style.color = 'red';
      }
      if (payload.isadmin == false) {
        window.location.href = '/views/signin.html';
      }
    });
}
