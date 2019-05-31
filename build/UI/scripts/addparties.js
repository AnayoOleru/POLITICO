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
// const username;
// const nameside;
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

      // username = `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`;

      // nameside = `<span>${payload.userName} ${payload.lastName}</span>`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvYWRkcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwic2lkZU5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuUGFydHkiLCJhZGRidG4iLCJlZGl0QnRuIiwiZGVsZXRlUGFydHkiLCJkZWxldGVCdG4iLCJvcGVuTW9kYWwiLCJvcGVuTmF2Iiwic3R5bGUiLCJ3aWR0aCIsImNsb3NlTmF2Iiwib3BlbkxvZyIsImRpc3BsYXkiLCJkaXNhYmxlZCIsImNsb3NlTG9nIiwib3BlbkRlbGV0ZSIsImNsb3NlRGVsZXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZFBhcnR5IiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZSIsInZhbHVlIiwiaHFhZGRyZXNzIiwibG9nb1VybCIsInJlc3VsdCIsInJlc3BvbnNlU3RhdHVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQWNjZXB0IiwiYm9keSIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXMiLCJvayIsImlubmVySFRNTCIsImNvbG9yIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImRhdGEiLCJ1c2VyIiwiaXNhZG1pbiIsImdldFBhcnRpZXMiLCJmb3JFYWNoIiwicGFydHkiLCJpZCIsInVzZXJuYW1lIiwibmFtZXNpZGUiLCJvcGVuRWRpdCIsImRhdGFzZXQiLCJwYXJ0eUlkIiwiY2xvc2VFZGl0IiwiZWRpdFN1Ym1pdCIsIklkIiwiZGVsUmVzdWx0IiwiZGVsZXRlR28iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsUUFBUUMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsQ0FBZDtBQUNBLElBQU1DLFVBQVVD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QUFSLEVBQVk7QUFDVlQsdUJBQWlCLElBQWpCO0FBQ0FELGFBQU9XLFNBQVAsR0FBbUIsNEJBQW5CO0FBQ0FYLGFBQU9qQixLQUFQLENBQWE2QixLQUFiLEdBQXFCLE9BQXJCO0FBQ0FpQjtBQUNEO0FBQ0RmLFlBQVFDLEdBQVIsQ0FBWU4sR0FBWjtBQUNBLFdBQU9BLElBQUlJLElBQUosRUFBUDtBQUNELEdBakJIO0FBa0JFO0FBbEJGLEdBbUJHTCxJQW5CSCxDQW1CUSxVQUFDQyxHQUFELEVBQVM7QUFDYkssWUFBUUMsR0FBUixDQUFZTixHQUFaO0FBQ0EsUUFBSSxDQUFDUixjQUFMLEVBQXFCO0FBQ25CRCxhQUFPVyxTQUFQLEdBQW1CRixJQUFJTyxLQUF2QjtBQUNBaEIsYUFBT2pCLEtBQVAsQ0FBYTZCLEtBQWIsR0FBcUIsS0FBckI7QUFDRDtBQUNELFFBQUloRCxRQUFRdUQsT0FBUixJQUFtQixLQUF2QixFQUE4QjtBQUM1QjFELGFBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLG9CQUF2QjtBQUNEO0FBQ0YsR0E1Qkg7QUE2QkQiLCJmaWxlIjoiYWRkcGFydGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuXG5mdW5jdGlvbiB2ZXJpZnlUb2tlbigpIHtcbiAgaWYgKCF0b2tlbikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICB9XG4gIC8vIGNoZWNrIGlmIHVzZXIgaXMgbm90IGFuIGFkbWluXG4gIGlmIChwYXlsb2FkLmlzQWRtaW4gPT0gZmFsc2UpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxufVxuXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlTaWRlbmF2Jyk7XG5jb25zdCBvcGVuUGFydHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbnBhcnR5Jyk7XG5jb25zdCBhZGRidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkYnRuJyk7XG5jb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQnKTtcbmNvbnN0IGRlbGV0ZVBhcnR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZXBhcnR5Jyk7XG5jb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlJyk7XG5jb25zdCBvcGVuTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbm1vZGFsJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gIHNpZGVOYXYuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgc2lkZU5hdi5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuLy8gYWRkIHBhcnR5XG5cbmZ1bmN0aW9uIG9wZW5Mb2coKSB7XG4gIG9wZW5Nb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgZWRpdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTG9nKCkge1xuICBvcGVuTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICBkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbn1cblxuLy8gZGVsZXRlIHBhcnR5XG4vLyBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5EZWxldGUpXG5mdW5jdGlvbiBvcGVuRGVsZXRlKCkge1xuICBkZWxldGVQYXJ0eS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgYWRkYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgZWRpdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsb3NlRGVsZXRlKCkge1xuICBkZWxldGVQYXJ0eS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBhZGRidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xufVxuXG4vLyBjb25zdW1pbmcgQVBJXG4vLyBhZG1pbiBjYW4gY3JlYXRlIHBhcnR5XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUGFydHknKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGRQYXJ0eSk7XG5cbmZ1bmN0aW9uIGFkZFBhcnR5KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XG4gIGNvbnN0IGhxYWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdocWFkZHJlc3MnKS52YWx1ZTtcbiAgY29uc3QgbG9nb1VybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvVVJMJykudmFsdWU7XG4gIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgbGV0IHJlc3BvbnNlU3RhdHVzID0gZmFsc2U7XG5cblxuICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlbixcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWUsXG4gICAgICBocWFkZHJlc3MsXG4gICAgICBsb2dvVXJsLFxuICAgIH0pLFxuXG4gIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSAncGFydHkgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnO1xuICAgICAgICByZXN1bHQuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAvLyByZW5kZXIgdGhlIHBhcnRpZXMgcGFnZVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICBpZiAoIXJlc3BvbnNlU3RhdHVzKSB7XG4gICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSByZXMuZXJyb3I7XG4gICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvciA9ICdXaGl0ZSc7XG4gICAgICB9XG4gICAgICBpZiAocmVzLmRhdGFbMF0udXNlci5pc2FkbWluID09IHRydWUpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ25pbi5odG1sJztcbiAgICAgIH1cbiAgICB9KTtcbn1cbi8vIGNvbnN0IHVzZXJuYW1lO1xuLy8gY29uc3QgbmFtZXNpZGU7XG5mdW5jdGlvbiBnZXRQYXJ0aWVzKCkge1xuICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMnLCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHBhcnR5KSA9PiB7XG4gICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICs9IGA8ZGl2IGNsYXNzPVwiY29sLTEtb2YtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcGljdHVyZSBjYXJkX19waWN0dXJlLS0xXCIgaWQ9XCJwYXJ0eUltYWdlXCI+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHN0eWxlPVwiZm9udC1zaXplOiAzMHB4XCIgY2xhc3M9XCJwYXJ0eUlkXCIgaWQ9JHtwYXJ0eS5pZH0+JHtwYXJ0eS5uYW1lfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3NpZGUgY2FyZF9fc2lkZS0tYmFjayBjYXJkX19zaWRlLS1iYWNrLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19jdGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2Utb25seVwiPkhlYWRxdWF0ZXIgQWRkcmVzczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX19wcmljZS1vbmx5XCIgaWQ9XCJwYXJ0eUFkZHJlc3NcIj4ke3BhcnR5LmhxYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiIGlkPVwiZWRpdFwiIG9uY2xpY2s9XCJvcGVuRWRpdCgnJHtwYXJ0eS5pZH0nKVwiPkVkaXQ8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiIGlkPVwiZGVsZXRlXCIgb25jbGljaz1cIm9wZW5EZWxldGUoKVwiPkRlbGV0ZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiBgO1xuXG4gICAgICAgIC8vIHVzZXJuYW1lID0gYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9hPjwvbGk+YDtcblxuICAgICAgICAvLyBuYW1lc2lkZSA9IGA8c3Bhbj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L3NwYW4+YDtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnR5UmVzdWx0JykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KTtcbn1cblxuZ2V0UGFydGllcygpO1xuXG5mdW5jdGlvbiBvcGVuRWRpdChwYXJ0eSkge1xuICBvcGVuUGFydHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIG9wZW5QYXJ0eS5kYXRhc2V0LnBhcnR5SWQgPSBwYXJ0eTtcbiAgYWRkYnRuLmRpc2FibGVkID0gdHJ1ZTtcbn1cblxuXG5mdW5jdGlvbiBjbG9zZUVkaXQoKSB7XG4gIG9wZW5QYXJ0eS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgYWRkYnRuLmRpc2FibGVkID0gZmFsc2U7XG59XG5sZXQgcmVzcG9uc2VTdGF0dXMgPSBmYWxzZTtcbmNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcblxuZnVuY3Rpb24gZWRpdFN1Ym1pdCgpIHtcbiAgY29uc3QgSWQgPSBvcGVuUGFydHkuZGF0YXNldC5wYXJ0eUlkO1xuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXR2YWx1ZScpLnZhbHVlO1xuXG4gIGZldGNoKGBodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllcy8ke0lkfS9uYW1lYCwge1xuICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZSxcbiAgICB9KSxcblxuICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICBkZWxSZXN1bHQuaW5uZXJIVE1MID0gJ0NhbmRpZGF0ZSBuYW1lIGhhZCBjaGFuZ2VkJztcbiAgICAgICAgZGVsUmVzdWx0LnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgY2xvc2VFZGl0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHJlbmRlciB0aGUgcGFydGllcyBwYWdlXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIGlmICghcmVzcG9uc2VTdGF0dXMpIHtcbiAgICAgICAgZGVsUmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgZGVsUmVzdWx0LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICB9XG4gICAgICBpZiAocGF5bG9hZC5pc2FkbWluID09IGZhbHNlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbi8vIGRlbGV0ZSBwYXJ0eVxubGV0IGRlbFJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxSZXN1bHQnKTtcblxuZnVuY3Rpb24gZGVsZXRlR28oKSB7XG4gIGNvbnN0IElkID0gb3BlblBhcnR5LmRhdGFzZXQucGFydHlJZDtcblxuICBmZXRjaChgaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMvJHtJZH1gLCB7XG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSAnQ2FuZGlkYXRlIG5hbWUgaGFkIGNoYW5nZWQnO1xuICAgICAgICByZXN1bHQuc3R5bGUuY29sb3IgPSAnZ3JlZW4nO1xuICAgICAgICBjbG9zZUVkaXQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHJlbmRlciB0aGUgcGFydGllcyBwYWdlXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIGlmICghcmVzcG9uc2VTdGF0dXMpIHtcbiAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICB9XG4gICAgICBpZiAocGF5bG9hZC5pc2FkbWluID09IGZhbHNlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICB9XG4gICAgfSk7XG59XG4iXX0=