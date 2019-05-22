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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsInBheWxvYWQiLCJKU09OIiwiZG9jdW1lbnQiLCJ2b3RlZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInJlcyIsImNvbnNvbGUiLCJyZXN1bHQiLCJkYXRhIiwiY2FuZGlkYXRlIiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImJvZHkiLCJjcmVhdGVkX2J5IiwidXNlck5hbWUiLCJvZmZpY2UiLCJvZmZpY2VOYW1lIiwiY2FuZGlkYXRlTmFtZSIsInJlc3BvbnNlU3RhdHVzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLE9BQUFBLFlBQUFBLENBQUFBLE9BQUFBLENBQVosT0FBWUEsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUFBLEtBQUFBLENBQVdGLE9BQUFBLElBQUFBLENBQVlELE1BQUFBLEtBQUFBLENBQUFBLEdBQUFBLEVBQXJDLENBQXFDQSxDQUFaQyxDQUFYRSxDQUFkO0FBQ0EsU0FBQSxXQUFBLEdBQXNCO0FBQ2xCO0FBQ0EsUUFBRyxDQUFILEtBQUEsRUFBVTtBQUNORixlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBQ0EsUUFBR0MsUUFBQUEsT0FBQUEsSUFBSCxJQUFBLEVBQTJCO0FBQ3ZCRCxlQUFBQSxRQUFBQSxDQUFBQSxJQUFBQSxHQUFBQSxxQkFBQUE7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRCxTQUFBLE9BQUEsR0FBbUI7QUFDZkcsYUFBQUEsY0FBQUEsQ0FBQUEsV0FBQUEsRUFBQUEsS0FBQUEsQ0FBQUEsS0FBQUEsR0FBQUEsT0FBQUE7QUFDSDs7QUFFRCxTQUFBLFFBQUEsR0FBb0I7QUFDaEJBLGFBQUFBLGNBQUFBLENBQUFBLFdBQUFBLEVBQUFBLEtBQUFBLENBQUFBLEtBQUFBLEdBQUFBLEdBQUFBO0FBQ0g7O0FBRUQsSUFBSUMsUUFBUUQsU0FBQUEsY0FBQUEsQ0FBWixPQUFZQSxDQUFaO0FBQ0EsU0FBQSxTQUFBLEdBQW9CO0FBQ2hCQyxVQUFBQSxLQUFBQSxDQUFBQSxlQUFBQSxHQUFBQSxPQUFBQTtBQUNBQSxVQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxTQUFBQTtBQUNIOztBQUdEO0FBQ0EsU0FBQSxnQkFBQSxHQUEyQjtBQUN2QkMsVUFBQUEsb0NBQUFBLEVBQTRDO0FBQ3hDQyxnQkFEd0MsS0FBQTtBQUV4Q0MsaUJBQVM7QUFDTCxzQkFESyxtQ0FBQTtBQUVMLDRCQUZLLGtCQUFBO0FBR0wsOEJBQWtCUjtBQUhiO0FBRitCLEtBQTVDTSxFQUFBQSxJQUFBQSxDQVFVLFVBQUEsR0FBQSxFQUFBO0FBQUEsZUFBU0csSUFBVCxJQUFTQSxFQUFUO0FBUlZILEtBQUFBLEVBQUFBLElBQUFBLENBU1UsVUFBQSxJQUFBLEVBQVU7QUFDWkksZ0JBQUFBLEdBQUFBLENBQUFBLElBQUFBO0FBQ0EsWUFBSUMsU0FBSixFQUFBO0FBQ0FDLGFBQUFBLElBQUFBLENBQUFBLE9BQUFBLENBQWtCLFVBQUEsU0FBQSxFQUFlO0FBQzdCRCxzQkFBQUEsaVhBU3dERSxVQVR4REYsV0FBQUEsR0FBQUEsR0FBQUEsR0FTaUZFLFVBVGpGRixVQUFBQSxHQUFBQSxvSUFBQUEsR0FhMEJFLFVBYjFCRixhQUFBQSxHQUFBQSx5UUFBQUEsR0FvQjBCRSxVQXBCMUJGLFNBQUFBLEdBQUFBLGlEQUFBQSxHQXFCMkJFLFVBckIzQkYsYUFBQUEsR0FBQUEsb0ZBQUFBLEdBdUJ1Q0UsVUF2QnZDRixNQUFBQSxHQUFBQSxRQUFBQSxHQXVCOERFLFVBdkI5REYsVUFBQUEsR0FBQUEsUUFBQUEsR0F1QnlGRSxVQXZCekZGLFdBQUFBLEdBQUFBLFFBQUFBLEdBdUJxSEUsVUF2QnJIRixhQUFBQSxHQUFBQSxxSkFBQUE7QUFESkMsU0FBQUE7O0FBaUNMUixpQkFBQUEsY0FBQUEsQ0FBQUEsZ0JBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLE1BQUFBO0FBQ0FBLGlCQUFBQSxjQUFBQSxDQUFBQSxVQUFBQSxFQUFBQSxTQUFBQSxHQUFBQSxRQUFBQTtBQUNBQSxpQkFBQUEsY0FBQUEsQ0FBQUEsVUFBQUEsRUFBQUEsU0FBQUEsR0FBQUEsUUFBQUE7QUEvQ0hFLEtBQUFBO0FBa0RIOztBQUVEUTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQSxhQUFBLEVBQTZEO0FBQ3pESixZQUFBQSxHQUFBQSxDQUFZUixRQUFaUSxRQUFBQTs7QUFFQUosVUFBQUEsa0RBQUFBLEVBQTBEO0FBQ3REQyxnQkFEc0QsTUFBQTtBQUV0REMsaUJBQVM7QUFDTCxzQkFESyxtQ0FBQTtBQUVMLDRCQUZLLGtCQUFBO0FBR0wsOEJBQWtCUjtBQUhiLFNBRjZDO0FBT3REZSxjQUFNLEtBQUEsU0FBQSxDQUFlO0FBQ2pCQyx3QkFBWWQsUUFESyxFQUFBO0FBRWpCZSxzQkFBVWYsUUFGTyxRQUFBO0FBR2pCZ0Isb0JBSGlCLE1BQUE7QUFJakJDLHdCQUppQixVQUFBO0FBS2pCTix1QkFMaUIsV0FBQTtBQU1qQk8sMkJBQWVBO0FBTkUsU0FBZjs7QUFQZ0QsS0FBMURkLEVBQUFBLElBQUFBLENBaUJNLFVBQUEsR0FBQSxFQUFTO0FBQ1gsWUFBR0csSUFBSCxFQUFBLEVBQVU7QUFDTlksNkJBQUFBLElBQUFBO0FBQ0E7QUFDSDtBQUNGLGVBQU9aLElBQVAsSUFBT0EsRUFBUDtBQXRCSEgsS0FBQUE7QUF3QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgLy8gY2hlY2sgaWYgbm8gdG9rZW5cbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gb25seSBhZG1pbiBjYW4gYWNjZXNzIHRoaXMgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgLy8gaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgIC8vICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgIC8vICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgLy8gICAgIH0sIDMwMDAwKTtcbiAgICAvLyB9XG59XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjI1MHB4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cbmxldCB2b3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90ZWRcIik7XG5mdW5jdGlvbiB2b3RlQ29sb3IoKXtcbiAgICB2b3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgdm90ZWQuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcbn1cblxuXG4vLyB1c2VycyBnZXQgYWxsIGNhbmRpZGF0ZXNcbmZ1bmN0aW9uIGdldEFsbENhbmRpZGF0ZXMoKXtcbiAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdC9hcGkvdjEvY2FuZGlkYXRlcycsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKGNhbmRpZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xLW9mLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3NpZGUgY2FyZF9fc2lkZS0tZnJvbnRcIj5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3BpY3R1cmUgY2FyZF9fcGljdHVyZS0tMVwiPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfX2hlYWRpbmdcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZF9faGVhZGluZy1zcGFuIGNhcmRfX2hlYWRpbmctc3Bhbi0tMVwiIGlkPSR7Y2FuZGlkYXRlLmNhbmRpZGF0ZWlkfT4ke2NhbmRpZGF0ZS5vZmZpY2VuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIHN0eWxlPVwiZm9udC1zaXplOiAyNXB4XCI+JHtjYW5kaWRhdGUuY2FuZGlkYXRlbmFtZX08L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3NpZGUgY2FyZF9fc2lkZS0tYmFjayBjYXJkX19zaWRlLS1iYWNrLTFcIj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fY3RhXCI+XG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3ByaWNlLWJveFwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX19wcmljZS1vbmx5XCI+JHtjYW5kaWRhdGUucGFydHluYW1lfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF9fcHJpY2UtdmFsdWVcIj4ke2NhbmRpZGF0ZS5jYW5kaWRhdGVuYW1lfTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG5cIiBvbkNsaWNrPVwidm90ZSgnJHtjYW5kaWRhdGUub2ZmaWNlfScsICcke2NhbmRpZGF0ZS5vZmZpY2VuYW1lfScsICcke2NhbmRpZGF0ZS5jYW5kaWRhdGVpZH0nLCAnJHtjYW5kaWRhdGUuY2FuZGlkYXRlbmFtZX0nKVwiPlZvdGU8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmRpZGF0ZXNjYXJkJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgICAgICBcbiAgICB9KSAgICAgICAgXG59XG5cbmdldEFsbENhbmRpZGF0ZXMoKTtcblxuZnVuY3Rpb24gdm90ZShvZmZpY2UsIG9mZmljZU5hbWUsIGNhbmRpZGF0ZUlkLCBjYW5kaWRhdGVOYW1lKXtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkLmxhc3ROYW1lKTtcblxuICAgIGZldGNoKCdodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvdm90ZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY3JlYXRlZF9ieTogcGF5bG9hZC5pZCwgXG4gICAgICAgICAgICB1c2VyTmFtZTogcGF5bG9hZC5sYXN0TmFtZSxcbiAgICAgICAgICAgIG9mZmljZTogb2ZmaWNlLFxuICAgICAgICAgICAgb2ZmaWNlTmFtZTogb2ZmaWNlTmFtZSxcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogY2FuZGlkYXRlSWQsXG4gICAgICAgICAgICBjYW5kaWRhdGVOYW1lOiBjYW5kaWRhdGVOYW1lXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMub2spe1xuICAgICAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4nKS5zdHlsZS5iYWNrZ3JvdW5kLWNvbG9yIDogXCJyZWRcIjtcbiAgICAgICAgfVxuICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyAudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gICAgIGlmKCFyZXNwb25zZVN0YXR1cyl7XG4gICAgIFxuICAgIC8vICAgICB9ZWxzZXtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pXG59XG4iXX0=