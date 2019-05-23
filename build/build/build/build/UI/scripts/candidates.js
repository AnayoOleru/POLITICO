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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsInBheWxvYWQiLCJKU09OIiwiZG9jdW1lbnQiLCJ2b3RlZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInJlcyIsImNvbnNvbGUiLCJyZXN1bHQiLCJkYXRhIiwiY2FuZGlkYXRlIiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImJvZHkiLCJjcmVhdGVkX2J5IiwidXNlck5hbWUiLCJvZmZpY2UiLCJvZmZpY2VOYW1lIiwiY2FuZGlkYXRlTmFtZSIsInJlc3BvbnNlU3RhdHVzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLE9BQUFBLFlBQUFBLENBQUFBLE9BQUFBLENBQVosT0FBWUEsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUFBLEtBQUFBLENBQVdGLE9BQUFBLElBQUFBLENBQVlELE1BQUFBLEtBQUFBLENBQUFBLEdBQUFBLEVBQXJDLENBQXFDQSxDQUFaQyxDQUFYRSxDQUFkO0FBQ0EsU0FBQSxXQUFBLEdBQXNCO0FBQ2xCO0FBQ0EsUUFBRyxDQUFILEtBQUEsRUFBVTtBQUNORixlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBQ0EsUUFBR0MsUUFBQUEsT0FBQUEsSUFBSCxJQUFBLEVBQTJCO0FBQ3ZCRCxlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRCxTQUFBLE9BQUEsR0FBbUI7QUFDZkcsYUFBQUEsY0FBQUEsQ0FBQUEsV0FBQUEsRUFBQUEsS0FBQUEsQ0FBQUEsS0FBQUEsR0FBQUEsT0FBQUE7QUFDSDs7QUFFRCxTQUFBLFFBQUEsR0FBb0I7QUFDaEJBLGFBQUFBLGNBQUFBLENBQUFBLFdBQUFBLEVBQUFBLEtBQUFBLENBQUFBLEtBQUFBLEdBQUFBLEdBQUFBO0FBQ0g7O0FBRUQsSUFBSUMsUUFBUUQsU0FBQUEsY0FBQUEsQ0FBWixPQUFZQSxDQUFaO0FBQ0EsU0FBQSxTQUFBLEdBQW9CO0FBQ2hCQyxVQUFBQSxLQUFBQSxDQUFBQSxlQUFBQSxHQUFBQSxPQUFBQTtBQUNBQSxVQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxTQUFBQTtBQUNIOztBQUdEO0FBQ0EsU0FBQSxnQkFBQSxHQUEyQjtBQUN2QkMsVUFBQUEsdURBQUFBLEVBQStEO0FBQzNEQyxnQkFEMkQsS0FBQTtBQUUzREMsaUJBQVM7QUFDTCxzQkFESyxtQ0FBQTtBQUVMLDRCQUZLLGtCQUFBO0FBR0wsOEJBQWtCUjtBQUhiO0FBRmtELEtBQS9ETSxFQUFBQSxJQUFBQSxDQVFVLFVBQUEsR0FBQSxFQUFBO0FBQUEsZUFBU0csSUFBVCxJQUFTQSxFQUFUO0FBUlZILEtBQUFBLEVBQUFBLElBQUFBLENBU1UsVUFBQSxJQUFBLEVBQVU7QUFDWkksZ0JBQUFBLEdBQUFBLENBQUFBLElBQUFBO0FBQ0EsWUFBSUMsU0FBSixFQUFBO0FBQ0FDLGFBQUFBLElBQUFBLENBQUFBLE9BQUFBLENBQWtCLFVBQUEsU0FBQSxFQUFlO0FBQzdCRCxzQkFBQUEsaVhBU3dERSxVQVR4REYsV0FBQUEsR0FBQUEsR0FBQUEsR0FTaUZFLFVBVGpGRixVQUFBQSxHQUFBQSxvSUFBQUEsR0FhMEJFLFVBYjFCRixhQUFBQSxHQUFBQSx5UUFBQUEsR0FvQjBCRSxVQXBCMUJGLFNBQUFBLEdBQUFBLGlEQUFBQSxHQXFCMkJFLFVBckIzQkYsYUFBQUEsR0FBQUEsb0ZBQUFBLEdBdUJ1Q0UsVUF2QnZDRixNQUFBQSxHQUFBQSxRQUFBQSxHQXVCOERFLFVBdkI5REYsVUFBQUEsR0FBQUEsUUFBQUEsR0F1QnlGRSxVQXZCekZGLFdBQUFBLEdBQUFBLFFBQUFBLEdBdUJxSEUsVUF2QnJIRixhQUFBQSxHQUFBQSxxSkFBQUE7QUFESkMsU0FBQUE7O0FBaUNMUixpQkFBQUEsY0FBQUEsQ0FBQUEsZ0JBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLE1BQUFBO0FBQ0FBLGlCQUFBQSxjQUFBQSxDQUFBQSxVQUFBQSxFQUFBQSxTQUFBQSxHQUFBQSxRQUFBQTtBQUNBQSxpQkFBQUEsY0FBQUEsQ0FBQUEsVUFBQUEsRUFBQUEsU0FBQUEsR0FBQUEsUUFBQUE7QUEvQ0hFLEtBQUFBO0FBa0RIOztBQUVEUTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQSxhQUFBLEVBQTZEO0FBQ3pESixZQUFBQSxHQUFBQSxDQUFZUixRQUFaUSxRQUFBQTs7QUFFQUosVUFBQUEsa0RBQUFBLEVBQTBEO0FBQ3REQyxnQkFEc0QsTUFBQTtBQUV0REMsaUJBQVM7QUFDTCxzQkFESyxtQ0FBQTtBQUVMLDRCQUZLLGtCQUFBO0FBR0wsOEJBQWtCUjtBQUhiLFNBRjZDO0FBT3REZSxjQUFNLEtBQUEsU0FBQSxDQUFlO0FBQ2pCQyx3QkFBWWQsUUFESyxFQUFBO0FBRWpCZSxzQkFBVWYsUUFGTyxRQUFBO0FBR2pCZ0Isb0JBSGlCLE1BQUE7QUFJakJDLHdCQUppQixVQUFBO0FBS2pCTix1QkFMaUIsV0FBQTtBQU1qQk8sMkJBQWVBO0FBTkUsU0FBZjs7QUFQZ0QsS0FBMURkLEVBQUFBLElBQUFBLENBaUJNLFVBQUEsR0FBQSxFQUFTO0FBQ1gsWUFBR0csSUFBSCxFQUFBLEVBQVU7QUFDTlksNkJBQUFBLElBQUFBO0FBQ0E7QUFDSDtBQUNGLGVBQU9aLElBQVAsSUFBT0EsRUFBUDtBQXRCSEgsS0FBQUE7QUF3QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgLy8gY2hlY2sgaWYgbm8gdG9rZW5cbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gb25seSBhZG1pbiBjYW4gYWNjZXNzIHRoaXMgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgLy8gaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgIC8vICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgIC8vICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgLy8gICAgIH0sIDMwMDAwKTtcbiAgICAvLyB9XG59XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjI1MHB4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cbmxldCB2b3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90ZWRcIik7XG5mdW5jdGlvbiB2b3RlQ29sb3IoKXtcbiAgICB2b3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgdm90ZWQuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcbn1cblxuXG4vLyB1c2VycyBnZXQgYWxsIGNhbmRpZGF0ZXNcbmZ1bmN0aW9uIGdldEFsbENhbmRpZGF0ZXMoKXtcbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL2NhbmRpZGF0ZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMS1vZi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWZyb250XCI+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19waWN0dXJlIGNhcmRfX3BpY3R1cmUtLTFcIj4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkX19oZWFkaW5nXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhcmRfX2hlYWRpbmctc3BhbiBjYXJkX19oZWFkaW5nLXNwYW4tLTFcIiBpZD0ke2NhbmRpZGF0ZS5jYW5kaWRhdGVpZH0+JHtjYW5kaWRhdGUub2ZmaWNlbmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBzdHlsZT1cImZvbnQtc2l6ZTogMjVweFwiPiR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19zaWRlIGNhcmRfX3NpZGUtLWJhY2sgY2FyZF9fc2lkZS0tYmFjay0xXCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2N0YVwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19wcmljZS1ib3hcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2Utb25seVwiPiR7Y2FuZGlkYXRlLnBhcnR5bmFtZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLXZhbHVlXCI+JHtjYW5kaWRhdGUuY2FuZGlkYXRlbmFtZX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuXCIgb25DbGljaz1cInZvdGUoJyR7Y2FuZGlkYXRlLm9mZmljZX0nLCAnJHtjYW5kaWRhdGUub2ZmaWNlbmFtZX0nLCAnJHtjYW5kaWRhdGUuY2FuZGlkYXRlaWR9JywgJyR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9JylcIj5Wb3RlPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5kaWRhdGVzY2FyZCcpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICAgICAgXG4gICAgfSkgICAgICAgIFxufVxuXG5nZXRBbGxDYW5kaWRhdGVzKCk7XG5cbmZ1bmN0aW9uIHZvdGUob2ZmaWNlLCBvZmZpY2VOYW1lLCBjYW5kaWRhdGVJZCwgY2FuZGlkYXRlTmFtZSl7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZC5sYXN0TmFtZSk7XG5cbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3ZvdGVzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNyZWF0ZWRfYnk6IHBheWxvYWQuaWQsIFxuICAgICAgICAgICAgdXNlck5hbWU6IHBheWxvYWQubGFzdE5hbWUsXG4gICAgICAgICAgICBvZmZpY2U6IG9mZmljZSxcbiAgICAgICAgICAgIG9mZmljZU5hbWU6IG9mZmljZU5hbWUsXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGNhbmRpZGF0ZUlkLFxuICAgICAgICAgICAgY2FuZGlkYXRlTmFtZTogY2FuZGlkYXRlTmFtZVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYocmVzLm9rKXtcbiAgICAgICAgICAgIHJlc3BvbnNlU3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykuc3R5bGUuYmFja2dyb3VuZC1jb2xvciA6IFwicmVkXCI7XG4gICAgICAgIH1cbiAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gICAgLy8gLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIC8vICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICBcbiAgICAvLyAgICAgfWVsc2V7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KVxufVxuIl19