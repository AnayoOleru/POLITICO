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
    // check if token has expired
    if (payload.exp >= payload.iat) {
        console.log("Token had expired!");
        window.location.href = '/views/401.html';
        setTimeout(function () {
            window.location.href = '/views/sign-in.html';
        }, 30000);
    }
}

var sideNav = document.getElementById("mySidenav");
var openParty = document.getElementById("openparty");
var addbtn = document.getElementById("addbtn");
var editBtn = document.getElementById("edit");
var deleteParty = document.getElementById("deleteparty");
var deleteBtn = document.getElementById("delete");
var openModal = document.getElementById("openmodal");

function openNav() {
    sideNav.style.width = "250px";
}

function closeNav() {
    sideNav.style.width = "0";
}

// add party

function openLog() {
    openModal.style.display = "block";
    editBtn.disabled = true;
    deleteBtn.disabled = true;
}

function closeLog() {
    openModal.style.display = "none";
    editBtn.disabled = false;
    deleteBtn.disabled = false;
}

// delete party
// deleteBtn.addEventListener("click", openDelete)
function openDelete() {
    deleteParty.style.display = "block";
    addbtn.disabled = true;
    editBtn.disabled = true;
}

function closeDelete() {
    deleteParty.style.display = "none";
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
            'Accept': 'application/json, text/plain, */*',
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
            result.innerHTML = "party successfully created";
            result.style.color = "white";
        }
        return res.json();
    })
    // render the parties page
    .then(function (res) {
        console.log(res);
        if (!responseStatus) {
            result.innerHTML = res.error;
            result.style.color = "White";
        }
        if (res.data[0].user.isadmin == true) {
            window.location.href = '/views/signin.html';
        }
    });
};

function getParties() {
    fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
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
    openParty.style.display = "block";
    openParty.dataset.partyId = party;
    addbtn.disabled = true;
}

function closeEdit() {
    openParty.style.display = "none";
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
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            name: name
        })

    }).then(function (res) {
        if (res.ok) {
            responseStatus = true;
            delResult.innerHTML = "Candidate name had changed";
            delResult.style.color = "white";
            closeEdit();
        }
        return res.json();
    })
    // render the parties page
    .then(function (res) {
        console.log(res);
        if (!responseStatus) {
            delResult.innerHTML = res.error;
            delResult.style.color = "red";
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
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        }
    }).then(function (res) {
        if (res.ok) {
            responseStatus = true;
            result.innerHTML = "Candidate name had changed";
            result.style.color = "green";
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
            result.style.color = "red";
        }
        if (payload.isadmin == false) {
            window.location.href = '/views/signin.html';
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvYWRkcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwiZXhwIiwiaWF0IiwiY29uc29sZSIsImxvZyIsInNldFRpbWVvdXQiLCJzaWRlTmF2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9wZW5QYXJ0eSIsImFkZGJ0biIsImVkaXRCdG4iLCJkZWxldGVQYXJ0eSIsImRlbGV0ZUJ0biIsIm9wZW5Nb2RhbCIsIm9wZW5OYXYiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJvcGVuTG9nIiwiZGlzcGxheSIsImRpc2FibGVkIiwiY2xvc2VMb2ciLCJvcGVuRGVsZXRlIiwiY2xvc2VEZWxldGUiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkUGFydHkiLCJlIiwicHJldmVudERlZmF1bHQiLCJuYW1lIiwidmFsdWUiLCJocWFkZHJlc3MiLCJsb2dvVXJsIiwicmVzdWx0IiwicmVzcG9uc2VTdGF0dXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5Iiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsIm9rIiwiaW5uZXJIVE1MIiwiY29sb3IiLCJqc29uIiwiZXJyb3IiLCJkYXRhIiwidXNlciIsImlzYWRtaW4iLCJnZXRQYXJ0aWVzIiwiZm9yRWFjaCIsInBhcnR5IiwiaWQiLCJ1c2VybmFtZSIsInVzZXJOYW1lIiwibGFzdE5hbWUiLCJuYW1lc2lkZSIsIm9wZW5FZGl0IiwiZGF0YXNldCIsInBhcnR5SWQiLCJjbG9zZUVkaXQiLCJlZGl0U3VibWl0IiwiSWQiLCJkZWxSZXN1bHQiLCJkZWxldGVHbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxP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OlsibGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcblxuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKXtcbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdXNlciBpcyBub3QgYW4gYWRtaW4gXG4gICAgaWYocGF5bG9hZC5pc0FkbWluID09IGZhbHNlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICB9XG4gICAgXG59XG5cblxubGV0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKTtcbmxldCBvcGVuUGFydHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5wYXJ0eVwiKTtcbmxldCBhZGRidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZGJ0blwiKTtcbmxldCBlZGl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0XCIpO1xubGV0IGRlbGV0ZVBhcnR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGVwYXJ0eVwiKTtcbmxldCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZVwiKTtcbmxldCBvcGVuTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5tb2RhbFwiKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBzaWRlTmF2LnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBzaWRlTmF2LnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cbi8vIGFkZCBwYXJ0eVxuXG5mdW5jdGlvbiBvcGVuTG9nKCkge1xuICAgIG9wZW5Nb2RhbC5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIlxuICAgIGVkaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTG9nKCkge1xuICAgIG9wZW5Nb2RhbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xuICAgIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbn1cblxuLy8gZGVsZXRlIHBhcnR5XG4vLyBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5EZWxldGUpXG5mdW5jdGlvbiBvcGVuRGVsZXRlKCkge1xuICAgIGRlbGV0ZVBhcnR5LnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO1xuICAgIGFkZGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgZWRpdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsb3NlRGVsZXRlKCkge1xuICAgIGRlbGV0ZVBhcnR5LnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XG4gICAgYWRkYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xufVxuXG4vLyBjb25zdW1pbmcgQVBJXG4vLyBhZG1pbiBjYW4gY3JlYXRlIHBhcnR5XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUGFydHknKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGRQYXJ0eSk7XG5cbmZ1bmN0aW9uIGFkZFBhcnR5KGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIFxuICAgIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcbiAgICBsZXQgaHFhZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hxYWRkcmVzcycpLnZhbHVlO1xuICAgIGxldCBsb2dvVXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ29VUkwnKS52YWx1ZTtcbiAgICBsZXQgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuICAgIGxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuXG5cbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbmFtZTogbmFtZSwgXG4gICAgICAgICAgICBocWFkZHJlc3M6IGhxYWRkcmVzcyxcbiAgICAgICAgICAgIGxvZ29Vcmw6IGxvZ29VcmxcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJwYXJ0eSBzdWNjZXNzZnVsbHkgY3JlYXRlZFwiO1xuICAgICAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yPVwid2hpdGVcIjtcbiAgICAgICAgfVxuICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyByZW5kZXIgdGhlIHBhcnRpZXMgcGFnZVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYoIXJlc3BvbnNlU3RhdHVzKXtcbiAgICAgICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSByZXMuZXJyb3I7XG4gICAgICAgICAgICByZXN1bHQuc3R5bGUuY29sb3I9XCJXaGl0ZVwiO1xuICAgICAgICB9IFxuICAgICAgICBpZihyZXMuZGF0YVswXS51c2VyLmlzYWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbmluLmh0bWwnO1xuICAgICAgICAgICAgfVxuICAgIH0pXG59O1xuXG5mdW5jdGlvbiBnZXRQYXJ0aWVzKCl7XG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9wYXJ0aWVzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgocGFydHkpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImNvbC0xLW9mLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1mcm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3BpY3R1cmUgY2FyZF9fcGljdHVyZS0tMVwiIGlkPVwicGFydHlJbWFnZVwiPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT1cImZvbnQtc2l6ZTogMzBweFwiIGNsYXNzPVwicGFydHlJZFwiIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWJhY2sgY2FyZF9fc2lkZS0tYmFjay0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fY3RhXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3ByaWNlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLW9ubHlcIj5IZWFkcXVhdGVyIEFkZHJlc3M8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2Utb25seVwiIGlkPVwicGFydHlBZGRyZXNzXCI+JHtwYXJ0eS5ocWFkZHJlc3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIiBpZD1cImVkaXRcIiBvbmNsaWNrPVwib3BlbkVkaXQoJyR7cGFydHkuaWR9JylcIj5FZGl0PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIiBpZD1cImRlbGV0ZVwiIG9uY2xpY2s9XCJvcGVuRGVsZXRlKClcIj5EZWxldGU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gYFxuXG4gICAgICAgICAgICB1c2VybmFtZSA9XG4gICAgICAgICAgICAgICAgYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9hPjwvbGk+YFxuXG4gICAgICAgICAgICAgICAgbmFtZXNpZGUgPVxuICAgICAgICAgICAgICAgIGA8c3Bhbj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L3NwYW4+YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0eVJlc3VsdCcpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgICAgICBcbiAgICB9KSAgXG59XG5cbmdldFBhcnRpZXMoKTtcblxuZnVuY3Rpb24gb3BlbkVkaXQocGFydHkpIHtcbiAgICBvcGVuUGFydHkuc3R5bGUuZGlzcGxheT1cImJsb2NrXCI7XG4gICAgb3BlblBhcnR5LmRhdGFzZXQucGFydHlJZCA9IHBhcnR5O1xuICAgIGFkZGJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cblxuZnVuY3Rpb24gY2xvc2VFZGl0KCkge1xuICAgIG9wZW5QYXJ0eS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xuICAgIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGFkZGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xufVxubGV0IHJlc3BvbnNlU3RhdHVzID0gZmFsc2U7XG5sZXQgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuXG5mdW5jdGlvbiBlZGl0U3VibWl0KCl7XG4gICAgbGV0IElkID0gb3BlblBhcnR5LmRhdGFzZXQucGFydHlJZDtcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0dmFsdWUnKS52YWx1ZTtcblxuICAgIGZldGNoKGBodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllcy8ke0lkfS9uYW1lYCwge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMub2spe1xuICAgICAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgZGVsUmVzdWx0LmlubmVySFRNTCA9IFwiQ2FuZGlkYXRlIG5hbWUgaGFkIGNoYW5nZWRcIjtcbiAgICAgICAgICAgIGRlbFJlc3VsdC5zdHlsZS5jb2xvcj1cIndoaXRlXCI7XG4gICAgICAgICAgICBjbG9zZUVkaXQoKTtcbiAgICAgICAgfVxuICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyByZW5kZXIgdGhlIHBhcnRpZXMgcGFnZVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYoIXJlc3BvbnNlU3RhdHVzKXtcbiAgICAgICAgICAgIGRlbFJlc3VsdC5pbm5lckhUTUwgPSByZXMuZXJyb3I7XG4gICAgICAgICAgICBkZWxSZXN1bHQuc3R5bGUuY29sb3I9XCJyZWRcIjtcbiAgICAgICAgfSBcbiAgICAgICAgaWYocGF5bG9hZC5pc2FkbWluID09IGZhbHNlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gZGVsZXRlIHBhcnR5XG5sZXQgZGVsUmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbFJlc3VsdCcpO1xuXG5mdW5jdGlvbiBkZWxldGVHbygpe1xuICAgIGxldCBJZCA9IG9wZW5QYXJ0eS5kYXRhc2V0LnBhcnR5SWQ7XG4gICBcbiAgICBmZXRjaChgaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMvJHtJZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LCAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJDYW5kaWRhdGUgbmFtZSBoYWQgY2hhbmdlZFwiO1xuICAgICAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yPVwiZ3JlZW5cIjtcbiAgICAgICAgICAgIGNsb3NlRWRpdCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIHJlbmRlciB0aGUgcGFydGllcyBwYWdlXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cInJlZFwiO1xuICAgICAgICB9IFxuICAgICAgICBpZihwYXlsb2FkLmlzYWRtaW4gPT0gZmFsc2Upe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ25pbi5odG1sJztcbiAgICAgICAgICAgIH1cbiAgICB9KVxufVxuIl19