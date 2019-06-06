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
  document.getElementById('mySidenav').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}

var voted = document.getElementById('voted');
function voteColor() {
  voted.style.backgroundColor = 'green';
  voted.style.color = '#ffffff';
}

// users get all candidates
function getAllCandidates() {
  fetch('https://trustpolitico.herokuapp.com/api/v1/candidates', {
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
      Accept: 'application/json, text/plain, */*',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvY2FuZGlkYXRlcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3Blbk5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJ2b3RlZCIsInZvdGVDb2xvciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiZ2V0QWxsQ2FuZGlkYXRlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlaWQiLCJvZmZpY2VuYW1lIiwiY2FuZGlkYXRlbmFtZSIsInBhcnR5bmFtZSIsIm9mZmljZSIsImlubmVySFRNTCIsInVzZXJuYW1lIiwibmFtZXNpZGUiLCJ2b3RlIiwib2ZmaWNlTmFtZSIsImNhbmRpZGF0ZUlkIiwiY2FuZGlkYXRlTmFtZSIsImxhc3ROYW1lIiwiYm9keSIsInN0cmluZ2lmeSIsImNyZWF0ZWRfYnkiLCJpZCIsInVzZXJOYW1lIiwib2siLCJyZXNwb25zZVN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFkO0FBQ0EsSUFBTUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVosQ0FBWCxDQUFoQjtBQUNBLFNBQVNDLFdBQVQsR0FBdUI7QUFDckI7QUFDQSxNQUFJLENBQUNULEtBQUwsRUFBWTtBQUNWQyxXQUFP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Q0E7O0FBRUY7QUFDQTtBQUNBO0FBQ0QiLCJmaWxlIjoiY2FuZGlkYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKSB7XG4gIC8vIGNoZWNrIGlmIG5vIHRva2VuXG4gIGlmICghdG9rZW4pIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxuICAvLyBvbmx5IGFkbWluIGNhbiBhY2Nlc3MgdGhpcyBwYWdlXG4gIGlmIChwYXlsb2FkLmlzQWRtaW4gPT0gdHJ1ZSkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICB9XG4gIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gIC8vIGlmKHBheWxvYWQuZXhwID49IHBheWxvYWQuaWF0KXtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gaGFkIGV4cGlyZWQhXCIpXG4gIC8vICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAvLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAvLyAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAvLyAgICAgfSwgMzAwMDApO1xuICAvLyB9XG59XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYnKS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlTaWRlbmF2Jykuc3R5bGUud2lkdGggPSAnMCc7XG59XG5cbmNvbnN0IHZvdGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvdGVkJyk7XG5mdW5jdGlvbiB2b3RlQ29sb3IoKSB7XG4gIHZvdGVkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmVlbic7XG4gIHZvdGVkLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xufVxuXG5cbi8vIHVzZXJzIGdldCBhbGwgY2FuZGlkYXRlc1xuZnVuY3Rpb24gZ2V0QWxsQ2FuZGlkYXRlcygpIHtcbiAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9jYW5kaWRhdGVzJywge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlbixcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+IHtcbiAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEtb2YtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1mcm9udFwiPlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcGljdHVyZSBjYXJkX19waWN0dXJlLS0xXCI+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF9faGVhZGluZ1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJkX19oZWFkaW5nLXNwYW4gY2FyZF9faGVhZGluZy1zcGFuLS0xXCIgaWQ9JHtjYW5kaWRhdGUuY2FuZGlkYXRlaWR9PiR7Y2FuZGlkYXRlLm9mZmljZW5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgc3R5bGU9XCJmb250LXNpemU6IDI1cHhcIj4ke2NhbmRpZGF0ZS5jYW5kaWRhdGVuYW1lfTwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1iYWNrIGNhcmRfX3NpZGUtLWJhY2stMVwiPlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX19jdGFcIj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fcHJpY2UtYm94XCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfX3ByaWNlLW9ubHlcIj4ke2NhbmRpZGF0ZS5wYXJ0eW5hbWV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX19wcmljZS12YWx1ZVwiPiR7Y2FuZGlkYXRlLmNhbmRpZGF0ZW5hbWV9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0blwiIG9uQ2xpY2s9XCJ2b3RlKCcke2NhbmRpZGF0ZS5vZmZpY2V9JywgJyR7Y2FuZGlkYXRlLm9mZmljZW5hbWV9JywgJyR7Y2FuZGlkYXRlLmNhbmRpZGF0ZWlkfScsICcke2NhbmRpZGF0ZS5jYW5kaWRhdGVuYW1lfScpXCI+Vm90ZTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICB9KTtcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmRpZGF0ZXNjYXJkJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KTtcbn1cblxuZ2V0QWxsQ2FuZGlkYXRlcygpO1xuXG5mdW5jdGlvbiB2b3RlKG9mZmljZSwgb2ZmaWNlTmFtZSwgY2FuZGlkYXRlSWQsIGNhbmRpZGF0ZU5hbWUpIHtcbiAgY29uc29sZS5sb2cocGF5bG9hZC5sYXN0TmFtZSk7XG5cbiAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS92b3RlcycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY3JlYXRlZF9ieTogcGF5bG9hZC5pZCxcbiAgICAgIHVzZXJOYW1lOiBwYXlsb2FkLmxhc3ROYW1lLFxuICAgICAgb2ZmaWNlLFxuICAgICAgb2ZmaWNlTmFtZSxcbiAgICAgIGNhbmRpZGF0ZTogY2FuZGlkYXRlSWQsXG4gICAgICBjYW5kaWRhdGVOYW1lLFxuICAgIH0pLFxuXG4gIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgIC8vICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuJykuc3R5bGUuYmFja2dyb3VuZC1jb2xvciA6IFwicmVkXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KTtcbiAgICAvLyAudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gICAgIGlmKCFyZXNwb25zZVN0YXR1cyl7XG5cbiAgLy8gICAgIH1lbHNle1xuICAvLyAgICAgfVxuICAvLyB9KVxufVxuIl19