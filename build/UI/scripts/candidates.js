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
    if (payload.exp >= payload.iat) {
        console.log("Token had expired!");
        window.location.href = '/views/401.html';
        setTimeout(function () {
            window.location.href = '/views/sign-in.html';
        }, 30000);
    }
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
            username = '<li><a href="#" class="active">' + payload.userName + ' ' + payload.lastName + '</</a></li>';

            nameside = '<span>' + payload.userName + ' ' + payload.lastName + '</span>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwiZXhwIiwiaWF0IiwiY29uc29sZSIsImxvZyIsInNldFRpbWVvdXQiLCJvcGVuTmF2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwid2lkdGgiLCJjbG9zZU5hdiIsInZvdGVkIiwidm90ZUNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJnZXRBbGxDYW5kaWRhdGVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVzdWx0IiwiZm9yRWFjaCIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZWlkIiwib2ZmaWNlbmFtZSIsImNhbmRpZGF0ZW5hbWUiLCJwYXJ0eW5hbWUiLCJvZmZpY2UiLCJ1c2VybmFtZSIsInVzZXJOYW1lIiwibGFzdE5hbWUiLCJuYW1lc2lkZSIsImlubmVySFRNTCIsInZvdGUiLCJvZmZpY2VOYW1lIiwiY2FuZGlkYXRlSWQiLCJjYW5kaWRhdGVOYW1lIiwiYm9keSIsInN0cmluZ2lmeSIsImNyZWF0ZWRfYnkiLCJpZCIsIm9rIiwicmVzcG9uc2VTdGF0dXMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUtDLEtBQUwsQ0FBV0wsT0FBT00sSUFBUCxDQUFZUCxNQUFNUSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFaLENBQVgsQ0FBZDtBQUNBLFNBQVNDLFdBQVQsR0FBc0I7QUFDbEI7QUFDQSxRQUFHLENBQUNULEtBQUos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cUQsY0FBTWhELEtBQUtpRCxTQUFMLENBQWU7QUFDakJDLHdCQUFZbkQsUUFBUW9ELEVBREg7QUFFakJYLHNCQUFVekMsUUFBUTBDLFFBRkQ7QUFHakJILG9CQUFRQSxNQUhTO0FBSWpCTyx3QkFBWUEsVUFKSztBQUtqQlosdUJBQVdhLFdBTE07QUFNakJDLDJCQUFlQTtBQU5FLFNBQWY7O0FBUGdELEtBQTFELEVBaUJDcEIsSUFqQkQsQ0FpQk0sVUFBQ0MsR0FBRCxFQUFTO0FBQ1gsWUFBR0EsSUFBSXdCLEVBQVAsRUFBVTtBQUNOQyw2QkFBaUIsSUFBakI7QUFDQTtBQUNIO0FBQ0YsZUFBT3pCLElBQUlDLElBQUosRUFBUDtBQUNGLEtBdkJEO0FBd0JBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDSCIsImZpbGUiOiJjYW5kaWRhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgLy8gY2hlY2sgaWYgbm8gdG9rZW5cbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gb25seSBhZG1pbiBjYW4gYWNjZXNzIHRoaXMgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjI1MHB4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cbmxldCB2b3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90ZWRcIik7XG5mdW5jdGlvbiB2b3RlQ29sb3IoKXtcbiAgICB2b3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgdm90ZWQuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcbn1cblxuXG4vLyB1c2VycyBnZXQgYWxsIGNhbmRpZGF0ZXNcbmZ1bmN0aW9uIGdldEFsbENhbmRpZGF0ZXMoKXtcbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL2NhbmRpZGF0ZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMS1vZi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19waWN0dXJlIGNhcmRfX3BpY3R1cmUtLTFcIj4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkX19oZWFkaW5nXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcmRfX2hlYWRpbmctc3BhbiBjYXJkX19oZWFkaW5nLXNwYW4tLTFcIiBpZD0ke2NhbmRpZGF0ZS5jYW5kaWRhdGVpZH0+JHtjYW5kaWRhdGUub2ZmaWNlbmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBzdHlsZT1cImZvbnQtc2l6ZTogMjVweFwiPiR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWJhY2sgY2FyZF9fc2lkZS0tYmFjay0xXCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2N0YVwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19wcmljZS1ib3hcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2Utb25seVwiPiR7Y2FuZGlkYXRlLnBhcnR5bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLXZhbHVlXCI+JHtjYW5kaWRhdGUuY2FuZGlkYXRlbmFtZX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgb25DbGljaz1cInZvdGUoJyR7Y2FuZGlkYXRlLm9mZmljZX0nLCAnJHtjYW5kaWRhdGUub2ZmaWNlbmFtZX0nLCAnJHtjYW5kaWRhdGUuY2FuZGlkYXRlaWR9JywgJyR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9JylcIj5Wb3RlPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID1cbiAgICAgICAgICAgICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08LzwvYT48L2xpPmBcblxuICAgICAgICAgICAgICAgIG5hbWVzaWRlID1cbiAgICAgICAgICAgICAgICBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmRpZGF0ZXNjYXJkJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgICAgICBcbiAgICB9KSAgICAgICAgXG59XG5cbmdldEFsbENhbmRpZGF0ZXMoKTtcblxuZnVuY3Rpb24gdm90ZShvZmZpY2UsIG9mZmljZU5hbWUsIGNhbmRpZGF0ZUlkLCBjYW5kaWRhdGVOYW1lKXtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkLmxhc3ROYW1lKTtcblxuICAgIGZldGNoKCdodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvdm90ZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY3JlYXRlZF9ieTogcGF5bG9hZC5pZCwgXG4gICAgICAgICAgICB1c2VyTmFtZTogcGF5bG9hZC5sYXN0TmFtZSxcbiAgICAgICAgICAgIG9mZmljZTogb2ZmaWNlLFxuICAgICAgICAgICAgb2ZmaWNlTmFtZTogb2ZmaWNlTmFtZSxcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogY2FuZGlkYXRlSWQsXG4gICAgICAgICAgICBjYW5kaWRhdGVOYW1lOiBjYW5kaWRhdGVOYW1lXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMub2spe1xuICAgICAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKS5zdHlsZS5iYWNrZ3JvdW5kLWNvbG9yIDogXCJyZWRcIjtcbiAgICAgICAgfVxuICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyAudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gICAgIGlmKCFyZXNwb25zZVN0YXR1cyl7XG4gICAgIFxuICAgIC8vICAgICB9ZWxzZXtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pXG59XG4iXX0=