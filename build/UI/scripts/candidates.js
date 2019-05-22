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
    fetch('http://localhost/api/v1/candidates', {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3Blbk5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJ2b3RlZCIsInZvdGVDb2xvciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlaWQiLCJvZmZpY2VuYW1lIiwiY2FuZGlkYXRlbmFtZSIsInBhcnR5bmFtZSIsIm9mZmljZSIsImlubmVySFRNTCIsInVzZXJuYW1lIiwibmFtZXNpZGUiLCJ2b3RlIiwib2ZmaWNlTmFtZSIsImNhbmRpZGF0ZUlkIiwiY2FuZGlkYXRlTmFtZSIsImxhc3ROYW1lIiwiYm9keSIsInN0cmluZ2lmeSIsImNyZWF0ZWRfYnkiLCJpZCIsInVzZXJOYW1lIiwib2siLCJyZXNwb25zZVN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVosQ0FBWCxDQUFkO0FBQ0EsU0FBU0MsV0FBVCxHQUFzQjtBQUNsQjtBQUNBLFFBQUcsQ0FBQ1QsS0FBSixFQUFVO0FBQ05DLGVBQU9TLFFBQVAsQ0FB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QUFDRixLQXZCRDtBQXdCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0giLCJmaWxlIjoiY2FuZGlkYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmxldCBwYXlsb2FkID0gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG5mdW5jdGlvbiB2ZXJpZnlUb2tlbigpe1xuICAgIC8vIGNoZWNrIGlmIG5vIHRva2VuXG4gICAgaWYoIXRva2VuKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIG9ubHkgYWRtaW4gY2FuIGFjY2VzcyB0aGlzIHBhZ2VcbiAgICBpZihwYXlsb2FkLmlzQWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIC8vIGlmKHBheWxvYWQuZXhwID49IHBheWxvYWQuaWF0KXtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJUb2tlbiBoYWQgZXhwaXJlZCFcIilcbiAgICAvLyAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzLzQwMS5odG1sJztcbiAgICAvLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7IFxuICAgIC8vICAgICB9LCAzMDAwMCk7XG4gICAgLy8gfVxufVxuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5sZXQgdm90ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvdGVkXCIpO1xuZnVuY3Rpb24gdm90ZUNvbG9yKCl7XG4gICAgdm90ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgIHZvdGVkLnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG59XG5cblxuLy8gdXNlcnMgZ2V0IGFsbCBjYW5kaWRhdGVzXG5mdW5jdGlvbiBnZXRBbGxDYW5kaWRhdGVzKCl7XG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3QvYXBpL3YxL2NhbmRpZGF0ZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMS1vZi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19waWN0dXJlIGNhcmRfX3BpY3R1cmUtLTFcIj4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkX19oZWFkaW5nXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcmRfX2hlYWRpbmctc3BhbiBjYXJkX19oZWFkaW5nLXNwYW4tLTFcIiBpZD0ke2NhbmRpZGF0ZS5jYW5kaWRhdGVpZH0+JHtjYW5kaWRhdGUub2ZmaWNlbmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBzdHlsZT1cImZvbnQtc2l6ZTogMjVweFwiPiR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWJhY2sgY2FyZF9fc2lkZS0tYmFjay0xXCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2N0YVwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19wcmljZS1ib3hcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2Utb25seVwiPiR7Y2FuZGlkYXRlLnBhcnR5bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLXZhbHVlXCI+JHtjYW5kaWRhdGUuY2FuZGlkYXRlbmFtZX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgb25DbGljaz1cInZvdGUoJyR7Y2FuZGlkYXRlLm9mZmljZX0nLCAnJHtjYW5kaWRhdGUub2ZmaWNlbmFtZX0nLCAnJHtjYW5kaWRhdGUuY2FuZGlkYXRlaWR9JywgJyR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9JylcIj5Wb3RlPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5kaWRhdGVzY2FyZCcpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICAgICAgXG4gICAgfSkgICAgICAgIFxufVxuXG5nZXRBbGxDYW5kaWRhdGVzKCk7XG5cbmZ1bmN0aW9uIHZvdGUob2ZmaWNlLCBvZmZpY2VOYW1lLCBjYW5kaWRhdGVJZCwgY2FuZGlkYXRlTmFtZSl7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZC5sYXN0TmFtZSk7XG5cbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3ZvdGVzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNyZWF0ZWRfYnk6IHBheWxvYWQuaWQsIFxuICAgICAgICAgICAgdXNlck5hbWU6IHBheWxvYWQubGFzdE5hbWUsXG4gICAgICAgICAgICBvZmZpY2U6IG9mZmljZSxcbiAgICAgICAgICAgIG9mZmljZU5hbWU6IG9mZmljZU5hbWUsXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGNhbmRpZGF0ZUlkLFxuICAgICAgICAgICAgY2FuZGlkYXRlTmFtZTogY2FuZGlkYXRlTmFtZVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYocmVzLm9rKXtcbiAgICAgICAgICAgIHJlc3BvbnNlU3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykuc3R5bGUuYmFja2dyb3VuZC1jb2xvciA6IFwicmVkXCI7XG4gICAgICAgIH1cbiAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gICAgLy8gLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIC8vICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICBcbiAgICAvLyAgICAgfWVsc2V7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KVxufVxuIl19