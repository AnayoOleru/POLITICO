'use strict';

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken() {
    if (!token) {
        window.location.href = '/views/sign-in.html';
    }
    // admin shouldn't be able to acess this page
    if (payload.isAdmin == true) {
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

function UserGetParties() {
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
            result += '<div class="col-1-of-3">\n                <div class="card">\n                    <div class="card__side card__side--front">\n                        <div class="card__picture card__picture--1" id="partyImage">&nbsp;</div>\n                        <div class="card__details">\n                            <ul>\n                                <li style="font-size: 30px" id="partyName">' + party.name + '</li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div> ';

            // username =
            // `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`

            // nameside =
            // `<span>${payload.userName} ${payload.lastName}</span>`
        });
        document.getElementById('partyResult').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    });
}

UserGetParties();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsInBheWxvYWQiLCJKU09OIiwiZG9jdW1lbnQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJyZXMiLCJjb25zb2xlIiwicmVzdWx0IiwiZGF0YSIsInBhcnR5IiwiVXNlckdldFBhcnRpZXMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsT0FBQUEsWUFBQUEsQ0FBQUEsT0FBQUEsQ0FBWixPQUFZQSxDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBQUEsS0FBQUEsQ0FBV0YsT0FBQUEsSUFBQUEsQ0FBWUQsTUFBQUEsS0FBQUEsQ0FBQUEsR0FBQUEsRUFBckMsQ0FBcUNBLENBQVpDLENBQVhFLENBQWQ7QUFDQSxTQUFBLFdBQUEsR0FBc0I7QUFDbEIsUUFBRyxDQUFILEtBQUEsRUFBVTtBQUNORixlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBQ0EsUUFBR0MsUUFBQUEsT0FBQUEsSUFBSCxJQUFBLEVBQTJCO0FBQ3ZCRCxlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBRUg7O0FBRUQsU0FBQSxPQUFBLEdBQW1CO0FBQ2ZHLGFBQUFBLGNBQUFBLENBQUFBLFdBQUFBLEVBQUFBLEtBQUFBLENBQUFBLEtBQUFBLEdBQUFBLE9BQUFBO0FBQ0g7O0FBRUQsU0FBQSxRQUFBLEdBQW9CO0FBQ2hCQSxhQUFBQSxjQUFBQSxDQUFBQSxXQUFBQSxFQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxHQUFBQTtBQUNIOztBQUdEOztBQUVBLFNBQUEsY0FBQSxHQUF5QjtBQUNyQkMsVUFBQUEsb0RBQUFBLEVBQTREO0FBQ3hEQyxnQkFEd0QsS0FBQTtBQUV4REMsaUJBQVM7QUFDTCxzQkFESyxtQ0FBQTtBQUVMLDRCQUZLLGtCQUFBO0FBR0wsOEJBQWtCUDtBQUhiO0FBRitDLEtBQTVESyxFQUFBQSxJQUFBQSxDQVFVLFVBQUEsR0FBQSxFQUFBO0FBQUEsZUFBU0csSUFBVCxJQUFTQSxFQUFUO0FBUlZILEtBQUFBLEVBQUFBLElBQUFBLENBU1UsVUFBQSxJQUFBLEVBQVU7QUFDWkksZ0JBQUFBLEdBQUFBLENBQUFBLElBQUFBO0FBQ0EsWUFBSUMsU0FBSixFQUFBO0FBQ0FDLGFBQUFBLElBQUFBLENBQUFBLE9BQUFBLENBQWtCLFVBQUEsS0FBQSxFQUFXO0FBQ3pCRCxzQkFBQUEsdVlBTzZERSxNQVA3REYsSUFBQUEsR0FBQUEsbUpBQUFBOztBQWNKO0FBQ0k7O0FBRUE7QUFDQTtBQW5CSkMsU0FBQUE7QUFxQkpQLGlCQUFBQSxjQUFBQSxDQUFBQSxhQUFBQSxFQUFBQSxTQUFBQSxHQUFBQSxNQUFBQTtBQUNBQSxpQkFBQUEsY0FBQUEsQ0FBQUEsVUFBQUEsRUFBQUEsU0FBQUEsR0FBQUEsUUFBQUE7QUFDQUEsaUJBQUFBLGNBQUFBLENBQUFBLFVBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLFFBQUFBO0FBbkNKQyxLQUFBQTtBQXdDSDs7QUFFRFEiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5sZXQgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKXtcbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gYWRtaW4gc2hvdWxkbid0IGJlIGFibGUgdG8gYWNlc3MgdGhpcyBwYWdlXG4gICAgaWYocGF5bG9hZC5pc0FkbWluID09IHRydWUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdG9rZW4gaGFzIGV4cGlyZWRcblxufVxuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5cbi8vIENvbnN1bWluZyB0aGUgQVBJIGZvciBwYXJ0aWVzLCB1c2VycyBzaG91bGQgYmUgYWJsZSB0byBnZXQgYWxsIHBhcnRpZXNcblxuZnVuY3Rpb24gVXNlckdldFBhcnRpZXMoKXtcbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiY29sLTEtb2YtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcGljdHVyZSBjYXJkX19waWN0dXJlLS0xXCIgaWQ9XCJwYXJ0eUltYWdlXCI+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHN0eWxlPVwiZm9udC1zaXplOiAzMHB4XCIgaWQ9XCJwYXJ0eU5hbWVcIj4ke3BhcnR5Lm5hbWV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IGBcblxuICAgICAgICAgICAgLy8gdXNlcm5hbWUgPVxuICAgICAgICAgICAgICAgIC8vIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcblxuICAgICAgICAgICAgICAgIC8vIG5hbWVzaWRlID1cbiAgICAgICAgICAgICAgICAvLyBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydHlSZXN1bHQnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KVxuICAgIFxuXG4gICAgICAgIFxufVxuXG5Vc2VyR2V0UGFydGllcygpO1xuIl19