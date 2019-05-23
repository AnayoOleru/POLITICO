'use strict';

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));

function verifyToken() {
  if (!token) {
    window.location.href = '/views/sign-in.html';
  }
  // check if user is not an admin
  if (payload.isAdmin == false) {
    window.location.href = '/views/sign-in.html';
  }
}

var sideNav = document.getElementById('mySidenav');
var openParty = document.getElementById('openparty');
var addbtn = document.getElementById('addbtn');
var editBtn = document.getElementById('edit');
var deleteParty = document.getElementById('deleteparty');
var deleteBtn = document.getElementById('delete');
var openModal = document.getElementById('openmodal');

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

  var name = document.getElementById('name').value;
  var hqaddress = document.getElementById('hqaddress').value;
  var logoUrl = document.getElementById('logoURL').value;
  var result = document.getElementById('result');
  var responseStatus = false;

  fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      name: name,
      hqaddress: hqaddress,
      logoUrl: logoUrl
    })

  }).then(function (res) {
    if (res.ok) {
      responseStatus = true;
      result.innerHTML = 'party successfully created';
      result.style.color = 'white';
    }
    return res.json();
  })
  // render the parties page
  .then(function (res) {
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
      'x-access-token': token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    var result = '';
    data.data.forEach(function (party) {
      result += '<div class="col-1-of-3">\n                <div class="card">\n                    <div class="card__side card__side--front">\n                        <div class="card__picture card__picture--1" id="partyImage">&nbsp;</div>\n                        <div class="card__details">\n                            <ul>\n                                <li style="font-size: 30px" class="partyId" id=' + party.id + '>' + party.name + '</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class="card__side card__side--back card__side--back-1">\n                        <div class="card__cta">\n                            <div class="card__price-box">\n                                <p class="card__price-only">Headquater Address</p>\n                                <p class="card__price-only" id="partyAddress">' + party.hqaddress + '</p>\n                            </div>\n                            <a href="#" class="btn" id="edit" onclick="openEdit(\'' + party.id + '\')">Edit</a>\n                            <a href="#" class="btn" id="delete" onclick="openDelete()">Delete</a>\n                        </div>\n                    </div>\n                </div>\n            </div> ';

      username = '<li><a href="#" class="active">' + payload.userName + ' ' + payload.lastName + '</a></li>';

      nameside = '<span>' + payload.userName + ' ' + payload.lastName + '</span>';
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
var responseStatus = false;
var result = document.getElementById('result');

function editSubmit() {
  var Id = openParty.dataset.partyId;
  var name = document.getElementById('editvalue').value;

  fetch('https://trustpolitico.herokuapp.com/api/v1/parties/' + Id + '/name', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      name: name
    })

  }).then(function (res) {
    if (res.ok) {
      responseStatus = true;
      delResult.innerHTML = 'Candidate name had changed';
      delResult.style.color = 'white';
      closeEdit();
    }
    return res.json();
  })
  // render the parties page
  .then(function (res) {
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
var delResult = document.getElementById('delResult');

function deleteGo() {
  var Id = openParty.dataset.partyId;

  fetch('https://trustpolitico.herokuapp.com/api/v1/parties/' + Id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token
    }
  }).then(function (res) {
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
  .then(function (res) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvYWRkcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwic2lkZU5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuUGFydHkiLCJhZGRidG4iLCJlZGl0QnRuIiwiZGVsZXRlUGFydHkiLCJkZWxldGVCdG4iLCJvcGVuTW9kYWwiLCJvcGVuTmF2Iiwic3R5bGUiLCJ3aWR0aCIsImNsb3NlTmF2Iiwib3BlbkxvZyIsImRpc3BsYXkiLCJkaXNhYmxlZCIsImNsb3NlTG9nIiwib3BlbkRlbGV0ZSIsImNsb3NlRGVsZXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFBhcnR5IiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZSIsInZhbHVlIiwiaHFhZGRyZXNzIiwibG9nb1VybCIsInJlc3VsdCIsInJlc3BvbnNlU3RhdHVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0IiwiYm9keSIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXMiLCJvayIsImlubmVySFRNTCIsImNvbG9yIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImRhdGEiLCJ1c2VyIiwiaXNhZG1pbiIsImdldFBhcnRpZXMiLCJmb3JFYWNoIiwicGFydHkiLCJpZCIsInVzZXJuYW1lIiwidXNlck5hbWUiLCJsYXN0TmFtZSIsIm5hbWVzaWRlIiwib3BlbkVkaXQiLCJkYXRhc2V0IiwicGFydHlJZCIsImNsb3NlRWRpdCIsImVkaXRTdWJtaXQiLCJJZCIsImRlbFJlc3VsdCIsImRlbGV0ZUdvIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFFBQVFDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLENBQWQ7QUFDQSxJQUFNQyxVQUFVQyxLQUFLQyxLQUFMLENBQVdMLE9BQU9NLElBQVAsQ0FBWVAsTUFBTVEsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBWixDQUFYLENBQWhCOztBQUVBLFNBQVNDLFdBQVQsR0FBdUI7QUFDckIsTUFBSSxDQUFDVCxLQUFMLEVBQVk7QUFDVkMsV0FBT1MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIscUJBQXZCO0FBQ0Q7QUFDRDtBQUNBLE1BQUlQLFFBQVFRLE9BQVIsSUFBbUIsS0FBdkIsRUFBOEI7QUFDNUJYLFdBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHFCQUF2QjtBQUNEO0FBQ0Y7O0FBR0QsSUFBTUUsVUFBVUMsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLFNBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEI7QUFDQSxJQUFNRSxTQUFTSCxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxJQUFNRyxVQUFVSixTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWhCO0FBQ0EsSUFBTUksY0FBY0wsU0FBU0MsY0FBVCxDQUF3QixhQUF4QixDQUFwQjtBQUNBLElBQU1LLFlBQVlOLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBbEI7QUFDQSxJQUFNTSxZQUFZUCxTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQWxCOztBQUVBLFNBQVNPLE9BQVQsR0FBbUI7QUFDakJULFVBQVFVLEtBQVIsQ0FBY0MsS0FBZCxHQUFzQixPQUF0QjtBQUNEOztBQUVELFNBQVNDLFFBQVQsR0FBb0I7QUFDbEJaLFVBQVFVLEtBQVIsQ0FBY0MsS0FBZCxHQUFzQixHQUF0QjtBQUNEOztBQUVEOztBQUVBLFNBQVNFLE9BQVQsR0FBbUI7QUFDakJMLFlBQVVFLEtBQVYsQ0FBZ0JJLE9BQWhCLEdBQTBCLE9BQTFCO0FBQ0FULFVBQVFVLFFBQVIsR0FBbUIsSUFBbkI7QUFDQVIsWUFBVVEsUUFBVixHQUFxQixJQUFyQjtBQUNEOztBQUVELFNBQVNDLFFBQVQsR0FBb0I7QUFDbEJSLFlBQVVFLEtBQVYsQ0FBZ0JJLE9BQWhCLEdBQTBCLE1BQTFCO0FBQ0FULFVBQVFVLFFBQVIsR0FBbUIsS0FBbkI7QUFDQVIsWUFBVVEsUUFBVixHQUFxQixLQUFyQjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxTQUFTRSxVQUFULEdBQXNCO0FBQ3BCWCxjQUFZSSxLQUFaLENBQWtCSSxPQUFsQixHQUE0QixPQUE1QjtBQUNBVixTQUFPVyxRQUFQLEdBQWtCLElBQWxCO0FBQ0FWLFVBQVFVLFFBQVIsR0FBbUIsSUFBbkI7QUFDRDs7QUFFRCxTQUFTRyxXQUFULEdBQXVCO0FBQ3JCWixjQUFZSSxLQUFaLENBQWtCSSxPQUFsQixHQUE0QixNQUE1QjtBQUNBVixTQUFPVyxRQUFQLEdBQWtCLEtBQWxCO0FBQ0FWLFVBQVFVLFFBQVIsR0FBbUIsS0FBbkI7QUFDRDs7QUFFRDtBQUNBO0FBQ0FkLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NpQixnQkFBcEMsQ0FBcUQsUUFBckQsRUFBK0RDLFFBQS9EOztBQUVBLFNBQVNBLFFBQVQsQ0FBa0JDLENBQWxCLEVBQXFCO0FBQ25CQSxJQUFFQyxjQUFGOztBQUdBLE1BQU1DLE9BQU90QixTQUFTQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDc0IsS0FBN0M7QUFDQSxNQUFNQyxZQUFZeEIsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ3NCLEtBQXZEO0FBQ0EsTUFBTUUsVUFBVXpCLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNzQixLQUFuRDtBQUNBLE1BQU1HLFNBQVMxQixTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxNQUFJMEIsaUJBQWlCLEtBQXJCOztBQUdBQyxRQUFNLG9EQUFOLEVBQTREO0FBQzFEQyxZQUFRLE1BRGtEO0FBRTFEQyxhQUFTO0FBQ1BDLGNBQVEsbUNBREQ7QUFFUCxzQkFBZ0Isa0JBRlQ7QUFHUCx3QkFBa0I3QztBQUhYLEtBRmlEO0FBTzFEOEMsVUFBTXpDLEtBQUswQyxTQUFMLENBQWU7QUFDbkJYLGdCQURtQjtBQUVuQkUsMEJBRm1CO0FBR25CQztBQUhtQixLQUFmOztBQVBvRCxHQUE1RCxFQWNHUyxJQWRILENBY1EsVUFBQ0MsR0FBRCxFQUFTO0FBQ2IsUUFBSUEsSUFBSUMsRUFBUixFQUFZO0FBQ1ZULHVCQUFpQixJQUFqQjtBQUNBRCxhQUFPVyxTQUFQLEdBQW1CLDRCQUFuQjtBQUNBWCxhQUFPakIsS0FBUCxDQUFhNkIsS0FBYixHQUFxQixPQUFyQjtBQUNEO0FBQ0QsV0FBT0gsSUFBSUksSUFBSixFQUFQO0FBQ0QsR0FyQkg7QUFzQkU7QUF0QkYsR0F1QkdMLElBdkJILENBdUJRLFVBQUNDLEdBQUQsRUFBUztBQUNiSyxZQUFRQyxHQUFSLENBQVlOLEdBQVo7QUFDQSxRQUFJLENBQUNSLGNBQUwsRUFBcUI7QUFDbkJELGFBQU9XLFNBQVAsR0FBbUJGLElBQUlPLEtBQXZCO0FBQ0FoQixhQUFPakIsS0FBUCxDQUFhNkIsS0FBYixHQUFxQixPQUFyQjtBQUNEO0FBQ0QsUUFBSUgsSUFBSVEsSUFBSixDQUFTLENBQVQsRUFBWUMsSUFBWixDQUFpQkMsT0FBakIsSUFBNEIsSUFBaEMsRUFBc0M7QUFDcEMxRCxhQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvQkFBdkI7QUFDRDtBQUNGLEdBaENIO0FBaUNEOztBQUVELFNBQVNpRCxVQUFULEdBQXNCO0FBQ3BCbEIsUUFBTSxvREFBTixFQUE0RDtBQUMxREMsWUFBUSxLQURrRDtBQUUxREMsYUFBUztBQUNQQyxjQUFRLG1DQUREO0FBRVAsc0JBQWdCLGtCQUZUO0FBR1Asd0JBQWtCN0M7QUFIWDtBQUZpRCxHQUE1RCxFQVFHZ0QsSUFSSCxDQVFRO0FBQUEsV0FBT0MsSUFBSUksSUFBSixFQUFQO0FBQUEsR0FSUixFQVNHTCxJQVRILENBU1EsVUFBQ1MsSUFBRCxFQUFVO0FBQ2RILFlBQVFDLEdBQVIsQ0FBWUUsSUFBWjtBQUNBLFFBQUlqQixTQUFTLEVBQWI7QUFDQWlCLFNBQUtBLElBQUwsQ0FBVUksT0FBVixDQUFrQixVQUFDQyxLQUFELEVBQVc7QUFDM0J0QiwyWkFPeUVzQixNQUFNQyxFQVAvRSxTQU9xRkQsTUFBTTFCLElBUDNGLDhjQWV3RTBCLE1BQU14QixTQWY5RSxvSUFpQjJFd0IsTUFBTUMsRUFqQmpGOztBQXdCQUMscURBQTRENUQsUUFBUTZELFFBQXBFLFNBQWdGN0QsUUFBUThELFFBQXhGOztBQUVBQyw0QkFBbUMvRCxRQUFRNkQsUUFBM0MsU0FBdUQ3RCxRQUFROEQsUUFBL0Q7QUFDRCxLQTVCRDtBQTZCQXBELGFBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUNvQyxTQUF2QyxHQUFtRFgsTUFBbkQ7QUFDQTFCLGFBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NvQyxTQUFwQyxHQUFnRGEsUUFBaEQ7QUFDQWxELGFBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NvQyxTQUFwQyxHQUFnRGdCLFFBQWhEO0FBQ0QsR0E1Q0g7QUE2Q0Q7O0FBRURQOztBQUVBLFNBQVNRLFFBQVQsQ0FBa0JOLEtBQWxCLEVBQXlCO0FBQ3ZCOUMsWUFBVU8sS0FBVixDQUFnQkksT0FBaEIsR0FBMEIsT0FBMUI7QUFDQVgsWUFBVXFELE9BQVYsQ0FBa0JDLE9BQWxCLEdBQTRCUixLQUE1QjtBQUNBN0MsU0FBT1csUUFBUCxHQUFrQixJQUFsQjtBQUNEOztBQUdELFNBQVMyQyxTQUFULEdBQXFCO0FBQ25CdkQsWUFBVU8sS0FBVixDQUFnQkksT0FBaEIsR0FBMEIsTUFBMUI7QUFDQVAsWUFBVVEsUUFBVixHQUFxQixLQUFyQjtBQUNBWCxTQUFPVyxRQUFQLEdBQWtCLEtBQWxCO0FBQ0Q7QUFDRCxJQUFJYSxpQkFBaUIsS0FBckI7QUFDQSxJQUFNRCxTQUFTMUIsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFmOztBQUVBLFNBQVN5RCxVQUFULEdBQXNCO0FBQ3BCLE1BQU1DLEtBQUt6RCxVQUFVcUQsT0FBVixDQUFrQkMsT0FBN0I7QUFDQSxNQUFNbEMsT0FBT3RCLFNBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNzQixLQUFsRDs7QUFFQUssZ0VBQTREK0IsRUFBNUQsWUFBdUU7QUFDckU5QixZQUFRLE9BRDZEO0FBRXJFQyxhQUFTO0FBQ1BDLGNBQVEsbUNBREQ7QUFFUCxzQkFBZ0Isa0JBRlQ7QUFHUCx3QkFBa0I3QztBQUhYLEtBRjREO0FBT3JFOEMsVUFBTXpDLEtBQUswQyxTQUFMLENBQWU7QUFDbkJYO0FBRG1CLEtBQWY7O0FBUCtELEdBQXZFLEVBWUdZLElBWkgsQ0FZUSxVQUFDQyxHQUFELEVBQVM7QUFDYixRQUFJQSxJQUFJQyxFQUFSLEVBQVk7QUFDVlQsdUJBQWlCLElBQWpCO0FBQ0FpQyxnQkFBVXZCLFNBQVYsR0FBc0IsNEJBQXRCO0FBQ0F1QixnQkFBVW5ELEtBQVYsQ0FBZ0I2QixLQUFoQixHQUF3QixPQUF4QjtBQUNBbUI7QUFDRDtBQUNELFdBQU90QixJQUFJSSxJQUFKLEVBQVA7QUFDRCxHQXBCSDtBQXFCRTtBQXJCRixHQXNCR0wsSUF0QkgsQ0FzQlEsVUFBQ0MsR0FBRCxFQUFTO0FBQ2JLLFlBQVFDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBLFFBQUksQ0FBQ1IsY0FBTCxFQUFxQjtBQUNuQmlDLGdCQUFVdkIsU0FBVixHQUFzQkYsSUFBSU8sS0FBMUI7QUFDQWtCLGdCQUFVbkQsS0FBVixDQUFnQjZCLEtBQWhCLEdBQXdCLEtBQXhCO0FBQ0Q7QUFDRCxRQUFJaEQsUUFBUXVELE9BQVIsSUFBbUIsS0FBdkIsRUFBOEI7QUFDNUIxRCxhQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvQkFBdkI7QUFDRDtBQUNGLEdBL0JIO0FBZ0NEOztBQUVEO0FBQ0EsSUFBSStELFlBQVk1RCxTQUFTQyxjQUFULENBQXdCLFdBQXhCLENBQWhCOztBQUVBLFNBQVM0RCxRQUFULEdBQW9CO0FBQ2xCLE1BQU1GLEtBQUt6RCxVQUFVcUQsT0FBVixDQUFrQkMsT0FBN0I7O0FBRUE1QixnRUFBNEQrQixFQUE1RCxFQUFrRTtBQUNoRTlCLFlBQVEsUUFEd0Q7QUFFaEVDLGFBQVM7QUFDUEMsY0FBUSxtQ0FERDtBQUVQLHNCQUFnQixrQkFGVDtBQUdQLHdCQUFrQjdDO0FBSFg7QUFGdUQsR0FBbEUsRUFRR2dELElBUkgsQ0FRUSxVQUFDQyxHQUFELEVBQVM7QUFDYixRQUFJQSxJQUFJQyxFQUFSLEVBQVk7QUFDVlQsdUJBQWlCLElBQWpCO0FBQ0FELGFBQU9XLFNBQVAsR0FBbUIsNEJBQW5CO0FBQ0FYLGFBQU9qQixLQUFQLENBQWE2QixLQUFiLEdBQXFCLE9BQXJCO0FBQ0FtQjtBQUNEO0FBQ0RqQixZQUFRQyxHQUFSLENBQVlOLEdBQVo7QUFDQSxXQUFPQSxJQUFJSSxJQUFKLEVBQVA7QUFDRCxHQWpCSDtBQWtCRTtBQWxCRixHQW1CR0wsSUFuQkgsQ0FtQlEsVUFBQ0MsR0FBRCxFQUFTO0FBQ2JLLFlBQVFDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBLFFBQUksQ0FBQ1IsY0FBTCxFQUFxQjtBQUNuQkQsYUFBT1csU0FBUCxHQUFtQkYsSUFBSU8sS0FBdkI7QUFDQWhCLGFBQU9qQixLQUFQLENBQWE2QixLQUFiLEdBQXFCLEtBQXJCO0FBQ0Q7QUFDRCxRQUFJaEQsUUFBUXVELE9BQVIsSUFBbUIsS0FBdkIsRUFBOEI7QUFDNUIxRCxhQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvQkFBdkI7QUFDRDtBQUNGLEdBNUJIO0FBNkJEIiwiZmlsZSI6ImFkZHBhcnRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcblxuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKSB7XG4gIGlmICghdG9rZW4pIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxuICAvLyBjaGVjayBpZiB1c2VyIGlzIG5vdCBhbiBhZG1pblxuICBpZiAocGF5bG9hZC5pc0FkbWluID09IGZhbHNlKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gIH1cbn1cblxuXG5jb25zdCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215U2lkZW5hdicpO1xuY29uc3Qgb3BlblBhcnR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5wYXJ0eScpO1xuY29uc3QgYWRkYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZGJ0bicpO1xuY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0Jyk7XG5jb25zdCBkZWxldGVQYXJ0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxldGVwYXJ0eScpO1xuY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZScpO1xuY29uc3Qgb3Blbk1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5tb2RhbCcpO1xuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICBzaWRlTmF2LnN0eWxlLndpZHRoID0gJzI1MHB4Jztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gIHNpZGVOYXYuc3R5bGUud2lkdGggPSAnMCc7XG59XG5cbi8vIGFkZCBwYXJ0eVxuXG5mdW5jdGlvbiBvcGVuTG9nKCkge1xuICBvcGVuTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGVkaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICBkZWxldGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjbG9zZUxvZygpIHtcbiAgb3Blbk1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XG59XG5cbi8vIGRlbGV0ZSBwYXJ0eVxuLy8gZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuRGVsZXRlKVxuZnVuY3Rpb24gb3BlbkRlbGV0ZSgpIHtcbiAgZGVsZXRlUGFydHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGFkZGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIGVkaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjbG9zZURlbGV0ZSgpIHtcbiAgZGVsZXRlUGFydHkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgYWRkYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbn1cblxuLy8gY29uc3VtaW5nIEFQSVxuLy8gYWRtaW4gY2FuIGNyZWF0ZSBwYXJ0eVxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFBhcnR5JykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkUGFydHkpO1xuXG5mdW5jdGlvbiBhZGRQYXJ0eShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlO1xuICBjb25zdCBocWFkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHFhZGRyZXNzJykudmFsdWU7XG4gIGNvbnN0IGxvZ29VcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nb1VSTCcpLnZhbHVlO1xuICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XG4gIGxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuXG5cbiAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9wYXJ0aWVzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lLFxuICAgICAgaHFhZGRyZXNzLFxuICAgICAgbG9nb1VybCxcbiAgICB9KSxcblxuICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gJ3BhcnR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkJztcbiAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gcmVuZGVyIHRoZSBwYXJ0aWVzIHBhZ2VcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgaWYgKCFyZXNwb25zZVN0YXR1cykge1xuICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gcmVzLmVycm9yO1xuICAgICAgICByZXN1bHQuc3R5bGUuY29sb3IgPSAnV2hpdGUnO1xuICAgICAgfVxuICAgICAgaWYgKHJlcy5kYXRhWzBdLnVzZXIuaXNhZG1pbiA9PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhcnRpZXMoKSB7XG4gIGZldGNoKCdodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllcycsIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgfSxcbiAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICBkYXRhLmRhdGEuZm9yRWFjaCgocGFydHkpID0+IHtcbiAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgKz0gYDxkaXYgY2xhc3M9XCJjb2wtMS1vZi0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3NpZGUgY2FyZF9fc2lkZS0tZnJvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19waWN0dXJlIGNhcmRfX3BpY3R1cmUtLTFcIiBpZD1cInBhcnR5SW1hZ2VcIj4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgc3R5bGU9XCJmb250LXNpemU6IDMwcHhcIiBjbGFzcz1cInBhcnR5SWRcIiBpZD0ke3BhcnR5LmlkfT4ke3BhcnR5Lm5hbWV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1iYWNrIGNhcmRfX3NpZGUtLWJhY2stMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2N0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX19wcmljZS1vbmx5XCI+SGVhZHF1YXRlciBBZGRyZXNzPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLW9ubHlcIiBpZD1cInBhcnR5QWRkcmVzc1wiPiR7cGFydHkuaHFhZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgaWQ9XCJlZGl0XCIgb25jbGljaz1cIm9wZW5FZGl0KCcke3BhcnR5LmlkfScpXCI+RWRpdDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgaWQ9XCJkZWxldGVcIiBvbmNsaWNrPVwib3BlbkRlbGV0ZSgpXCI+RGVsZXRlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IGA7XG5cbiAgICAgICAgdXNlcm5hbWUgPSAgICAgICAgICAgICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gO1xuXG4gICAgICAgIG5hbWVzaWRlID0gICAgICAgICAgICAgICAgYDxzcGFuPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvc3Bhbj5gO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydHlSZXN1bHQnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgIH0pO1xufVxuXG5nZXRQYXJ0aWVzKCk7XG5cbmZ1bmN0aW9uIG9wZW5FZGl0KHBhcnR5KSB7XG4gIG9wZW5QYXJ0eS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgb3BlblBhcnR5LmRhdGFzZXQucGFydHlJZCA9IHBhcnR5O1xuICBhZGRidG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIGNsb3NlRWRpdCgpIHtcbiAgb3BlblBhcnR5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICBhZGRidG4uZGlzYWJsZWQgPSBmYWxzZTtcbn1cbmxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuXG5mdW5jdGlvbiBlZGl0U3VibWl0KCkge1xuICBjb25zdCBJZCA9IG9wZW5QYXJ0eS5kYXRhc2V0LnBhcnR5SWQ7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdHZhbHVlJykudmFsdWU7XG5cbiAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9wYXJ0aWVzLyR7SWR9L25hbWVgLCB7XG4gICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lLFxuICAgIH0pLFxuXG4gIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgIGRlbFJlc3VsdC5pbm5lckhUTUwgPSAnQ2FuZGlkYXRlIG5hbWUgaGFkIGNoYW5nZWQnO1xuICAgICAgICBkZWxSZXN1bHQuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICBjbG9zZUVkaXQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gcmVuZGVyIHRoZSBwYXJ0aWVzIHBhZ2VcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgaWYgKCFyZXNwb25zZVN0YXR1cykge1xuICAgICAgICBkZWxSZXN1bHQuaW5uZXJIVE1MID0gcmVzLmVycm9yO1xuICAgICAgICBkZWxSZXN1bHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICAgIH1cbiAgICAgIGlmIChwYXlsb2FkLmlzYWRtaW4gPT0gZmFsc2UpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ25pbi5odG1sJztcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gZGVsZXRlIHBhcnR5XG5sZXQgZGVsUmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbFJlc3VsdCcpO1xuXG5mdW5jdGlvbiBkZWxldGVHbygpIHtcbiAgY29uc3QgSWQgPSBvcGVuUGFydHkuZGF0YXNldC5wYXJ0eUlkO1xuXG4gIGZldGNoKGBodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllcy8ke0lkfWAsIHtcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgfSxcbiAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJlc3BvbnNlU3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9ICdDYW5kaWRhdGUgbmFtZSBoYWQgY2hhbmdlZCc7XG4gICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvciA9ICdncmVlbic7XG4gICAgICAgIGNsb3NlRWRpdCgpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gcmVuZGVyIHRoZSBwYXJ0aWVzIHBhZ2VcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgaWYgKCFyZXNwb25zZVN0YXR1cykge1xuICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gcmVzLmVycm9yO1xuICAgICAgICByZXN1bHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICAgIH1cbiAgICAgIGlmIChwYXlsb2FkLmlzYWRtaW4gPT0gZmFsc2UpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ25pbi5odG1sJztcbiAgICAgIH1cbiAgICB9KTtcbn1cbiJdfQ==