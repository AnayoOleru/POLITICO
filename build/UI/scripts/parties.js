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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3Blbk5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJVc2VyR2V0UGFydGllcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwicGFydHkiLCJuYW1lIiwiaW5uZXJIVE1MIiwidXNlcm5hbWUiLCJuYW1lc2lkZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVosQ0FBWCxDQUFkO0FBQ0EsU0FBU0MsV0FBVCxHQUFzQjtBQUNsQixRQUFHLENBQUNULEtBQUosRUFBVTtBQUNOQyxlQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDSDtBQUNEO0FBQ0EsUUFBR1AsUUFBUVEsT0FBUixJQUFtQixJQUF0QixFQUEyQjtBQUN2QlgsZUFBT1MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIscUJBQXZCO0FBQ0g7QUFDRDtBQUVIOztBQUVELFNBQVNFLE9BQVQsR0FBbUI7QUFDZkMsYUFBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsS0FBckMsQ0FBMkNDLEtBQTNDLEdBQW1ELE9BQW5EO0FBQ0g7O0FBRUQsU0FBU0MsUUFBVCxHQUFvQjtBQUNoQkosYUFBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsS0FBckMsQ0FBMkNDLEtBQTNDLEdBQW1ELEdBQW5EO0FBQ0g7O0FBR0Q7O0FBRUEsU0FBU0UsY0FBVCxHQUF5QjtBQUNyQkMsVUFBTSxvREFBTixFQUE0RDtBQUN4REMsZ0JBQVEsS0FEZ0Q7QUFFeERDLGlCQUFTO0FBQ0wsc0JBQVUsbUNBREw7QUFFTCw0QkFBZ0Isa0JBRlg7QUFHTCw4QkFBa0J0QjtBQUhiO0FBRitDLEtBQTVELEVBUUt1QixJQVJMLENBUVUsVUFBQ0MsR0FBRDtBQUFBLGVBQVNBLElBQUlDLElBQUosRUFBVDtBQUFBLEtBUlYsRUFTS0YsSUFUTCxDQVNVLFVBQUNHLElBQUQsRUFBVTtBQUNaQyxnQkFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0EsWUFBSUcsU0FBUyxFQUFiO0FBQ0FILGFBQUtBLElBQUwsQ0FBVUksT0FBVixDQUFrQixVQUFDQyxLQUFELEVBQVc7QUFDekJGLDZaQU82REUsTUFBTUMsSUFQbkU7O0FBY0o7QUFDSTs7QUFFQTtBQUNBO0FBQ0gsU0FwQkQ7QUFxQkpsQixpQkFBU0MsY0FBVCxDQUF3QixhQUF4QixFQUF1Q2tCLFNBQXZDLEdBQW1ESixNQUFuRDtBQUNBZixpQkFBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ2tCLFNBQXBDLEdBQWdEQyxRQUFoRDtBQUNBcEIsaUJBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NrQixTQUFwQyxHQUFnREUsUUFBaEQ7QUFDSCxLQXBDRDtBQXdDSDs7QUFFRGhCIiwiZmlsZSI6InBhcnRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5sZXQgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKXtcbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gYWRtaW4gc2hvdWxkbid0IGJlIGFibGUgdG8gYWNlc3MgdGhpcyBwYWdlXG4gICAgaWYocGF5bG9hZC5pc0FkbWluID09IHRydWUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdG9rZW4gaGFzIGV4cGlyZWRcblxufVxuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5cbi8vIENvbnN1bWluZyB0aGUgQVBJIGZvciBwYXJ0aWVzLCB1c2VycyBzaG91bGQgYmUgYWJsZSB0byBnZXQgYWxsIHBhcnRpZXNcblxuZnVuY3Rpb24gVXNlckdldFBhcnRpZXMoKXtcbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiY29sLTEtb2YtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcGljdHVyZSBjYXJkX19waWN0dXJlLS0xXCIgaWQ9XCJwYXJ0eUltYWdlXCI+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHN0eWxlPVwiZm9udC1zaXplOiAzMHB4XCIgaWQ9XCJwYXJ0eU5hbWVcIj4ke3BhcnR5Lm5hbWV9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IGBcblxuICAgICAgICAgICAgLy8gdXNlcm5hbWUgPVxuICAgICAgICAgICAgICAgIC8vIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcblxuICAgICAgICAgICAgICAgIC8vIG5hbWVzaWRlID1cbiAgICAgICAgICAgICAgICAvLyBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydHlSZXN1bHQnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KVxuICAgIFxuXG4gICAgICAgIFxufVxuXG5Vc2VyR2V0UGFydGllcygpO1xuIl19