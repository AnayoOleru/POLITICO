'use strict';

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken() {
    // check if no token
    if (!token) {
        window.location.href = '/views/sign-in.html';
    }
    // only admin can access this page
    if (payload.isAdmin == true) {
        window.location.href = '/views/sign-in.html';
    }
    // check if token has expired
    // if(payload.exp >= payload.iat){
    //     console.log("Token had expired!")
    //     window.location.href = '/views/401.html';
    //     setTimeout(function(){
    //         window.location.href = '/views/sign-in.html'; 
    //     }, 30000);
    // }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var voted = document.getElementById("voted");
function voteColor() {
    voted.style.backgroundColor = "green";
    voted.style.color = "#ffffff";
}

// users get all candidates
function getAllCandidates() {
    fetch('https://trustpolitico.herokuapp.com/api/v1/candidates', {
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
        data.data.forEach(function (candidate) {
            result += '\n            <div class="row">\n            <div class="col-1-of-3">\n                        <div class="card">\n                <div class="card__side card__side--front">\n                 <div class="card__picture card__picture--1">&nbsp;</div>\n                <h4 class="card__heading">\n            <span class="card__heading-span card__heading-span--1" id=' + candidate.candidateid + '>' + candidate.officename + '</span>\n            </h4>\n            <div class="card__details">\n               <ul>\n            <li style="font-size: 25px">' + candidate.candidatename + '</li>\n            </ul>\n            </div>\n             </div>\n            <div class="card__side card__side--back card__side--back-1">\n             <div class="card__cta">\n             <div class="card__price-box">\n            <p class="card__price-only">' + candidate.partyname + '</p>\n            <p class="card__price-value">' + candidate.candidatename + '</p>\n              </div>\n              <a href="#" class="btn" onClick="vote(\'' + candidate.office + '\', \'' + candidate.officename + '\', \'' + candidate.candidateid + '\', \'' + candidate.candidatename + '\')">Vote</a>\n                </div>\n                    </div>\n                        </div>\n                        </div>\n                ';
        });

        document.getElementById('candidatescard').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    });
}

getAllCandidates();

function vote(office, officeName, candidateId, candidateName) {
    console.log(payload.lastName);

    fetch('https://trustpolitico.herokuapp.com/api/v1/votes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            created_by: payload.id,
            userName: payload.lastName,
            office: office,
            officeName: officeName,
            candidate: candidateId,
            candidateName: candidateName
        })

    }).then(function (res) {
        if (res.ok) {
            responseStatus = true;
            //  document.querySelectorAll('.btn').style.background-color : "red";
        }
        return res.json();
    });
    // .then((res) => {
    //     console.log(res);
    //     if(!responseStatus){

    //     }else{
    //     }
    // })
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3Blbk5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJ2b3RlZCIsInZvdGVDb2xvciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlaWQiLCJvZmZpY2VuYW1lIiwiY2FuZGlkYXRlbmFtZSIsInBhcnR5bmFtZSIsIm9mZmljZSIsImlubmVySFRNTCIsInVzZXJuYW1lIiwibmFtZXNpZGUiLCJ2b3RlIiwib2ZmaWNlTmFtZSIsImNhbmRpZGF0ZUlkIiwiY2FuZGlkYXRlTmFtZSIsImxhc3ROYW1lIiwiYm9keSIsInN0cmluZ2lmeSIsImNyZWF0ZWRfYnkiLCJpZCIsInVzZXJOYW1lIiwib2siLCJyZXNwb25zZVN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVosQ0FBWCxDQUFkO0FBQ0EsU0FBU0MsV0FBVCxHQUFzQjtBQUNsQjtBQUNBLFFBQUcsQ0FBQ1QsS0FBSixFQUFVO0FBQ05DLGVBQU9TLFFBQVAsQ0FB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QUFDRixLQXZCRDtBQXdCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0giLCJmaWxlIjoiY2FuZGlkYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmxldCBwYXlsb2FkID0gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG5mdW5jdGlvbiB2ZXJpZnlUb2tlbigpe1xuICAgIC8vIGNoZWNrIGlmIG5vIHRva2VuXG4gICAgaWYoIXRva2VuKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIG9ubHkgYWRtaW4gY2FuIGFjY2VzcyB0aGlzIHBhZ2VcbiAgICBpZihwYXlsb2FkLmlzQWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIC8vIGlmKHBheWxvYWQuZXhwID49IHBheWxvYWQuaWF0KXtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJUb2tlbiBoYWQgZXhwaXJlZCFcIilcbiAgICAvLyAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzLzQwMS5odG1sJztcbiAgICAvLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7IFxuICAgIC8vICAgICB9LCAzMDAwMCk7XG4gICAgLy8gfVxufVxuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5sZXQgdm90ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvdGVkXCIpO1xuZnVuY3Rpb24gdm90ZUNvbG9yKCl7XG4gICAgdm90ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgIHZvdGVkLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG59XG5cblxuLy8gdXNlcnMgZ2V0IGFsbCBjYW5kaWRhdGVzXG5mdW5jdGlvbiBnZXRBbGxDYW5kaWRhdGVzKCl7XG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9jYW5kaWRhdGVzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgoY2FuZGlkYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEtb2YtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1mcm9udFwiPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcGljdHVyZSBjYXJkX19waWN0dXJlLS0xXCI+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF9faGVhZGluZ1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJkX19oZWFkaW5nLXNwYW4gY2FyZF9faGVhZGluZy1zcGFuLS0xXCIgaWQ9JHtjYW5kaWRhdGUuY2FuZGlkYXRlaWR9PiR7Y2FuZGlkYXRlLm9mZmljZW5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgc3R5bGU9XCJmb250LXNpemU6IDI1cHhcIj4ke2NhbmRpZGF0ZS5jYW5kaWRhdGVuYW1lfTwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1iYWNrIGNhcmRfX3NpZGUtLWJhY2stMVwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19jdGFcIj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcHJpY2UtYm94XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLW9ubHlcIj4ke2NhbmRpZGF0ZS5wYXJ0eW5hbWV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX19wcmljZS12YWx1ZVwiPiR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiIG9uQ2xpY2s9XCJ2b3RlKCcke2NhbmRpZGF0ZS5vZmZpY2V9JywgJyR7Y2FuZGlkYXRlLm9mZmljZW5hbWV9JywgJyR7Y2FuZGlkYXRlLmNhbmRpZGF0ZWlkfScsICcke2NhbmRpZGF0ZS5jYW5kaWRhdGVuYW1lfScpXCI+Vm90ZTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGBcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuZGlkYXRlc2NhcmQnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4gICAgICAgIFxuICAgIH0pICAgICAgICBcbn1cblxuZ2V0QWxsQ2FuZGlkYXRlcygpO1xuXG5mdW5jdGlvbiB2b3RlKG9mZmljZSwgb2ZmaWNlTmFtZSwgY2FuZGlkYXRlSWQsIGNhbmRpZGF0ZU5hbWUpe1xuICAgIGNvbnNvbGUubG9nKHBheWxvYWQubGFzdE5hbWUpO1xuXG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS92b3RlcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjcmVhdGVkX2J5OiBwYXlsb2FkLmlkLCBcbiAgICAgICAgICAgIHVzZXJOYW1lOiBwYXlsb2FkLmxhc3ROYW1lLFxuICAgICAgICAgICAgb2ZmaWNlOiBvZmZpY2UsXG4gICAgICAgICAgICBvZmZpY2VOYW1lOiBvZmZpY2VOYW1lLFxuICAgICAgICAgICAgY2FuZGlkYXRlOiBjYW5kaWRhdGVJZCxcbiAgICAgICAgICAgIGNhbmRpZGF0ZU5hbWU6IGNhbmRpZGF0ZU5hbWVcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAvLyAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bicpLnN0eWxlLmJhY2tncm91bmQtY29sb3IgOiBcInJlZFwiO1xuICAgICAgICB9XG4gICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIC50aGVuKChyZXMpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAvLyAgICAgaWYoIXJlc3BvbnNlU3RhdHVzKXtcbiAgICAgXG4gICAgLy8gICAgIH1lbHNle1xuICAgIC8vICAgICB9XG4gICAgLy8gfSlcbn1cbiJdfQ==