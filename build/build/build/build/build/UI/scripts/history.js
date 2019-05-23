'use strict';

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken() {
  if (!token) {
    window.location.href = '/views/sign-in.html';
  }
  // admin should not be able to acess user personal page
  if (payload.isAdmin == true) {
    window.location.href = '/views/sign-in.html';
  }
  // check if token has expired
}

var open = document.getElementById('mySidenav');
var open2 = document.getElementById('mySidenav2');

function openNav() {
  open.style.width = '200px';
}

function closeNav() {
  open.style.width = '0';
}

function openNav2() {
  open2.style.width = '200px';
}

function closeNav2() {
  open2.style.width = '0';
}

// username
// function username(){
//     let result +=
//     `<li><a href="#" class="active">${payload.lastName}</a></li>`
//     document.getElementById('username').innerhtml = result;
// }

// username();

// consume API for results
function getOffice() {
  // fetch("http://localhost:3000/api/v1/candidates", {
  //     method: 'GET',
  //     headers: {
  //         'Accept': 'application/json, text/plain, */*',
  //         'Content-type': 'application/json',
  //         'x-access-token': token
  //     },
  // }).then((res) => res.json())
  // .then((data)=>{
  //     console.log(data);
  //     let result = '';
  //     data.data.forEach((candidate) =>{
  //         result +=
  //         ``
  //     });
  // }),

  fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
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
    data.data.forEach(function (office) {
      result += '<a href="#" onclick="showResult(\'' + office.id + '\', \'' + office.name + '\')"><span>' + office.name + '</span></a>';
    });
    document.getElementById('mySidenav2').innerHTML = result;
    document.getElementById('username').innerHTML = username;
    document.getElementById('nameside').innerHTML = nameside;
  });
}

getOffice();

function showResult(officeId, officeSName) {
  console.log(officeId);
  fetch('https://trustpolitico.herokuapp.com/api/v1/office/' + officeId + '/result', {
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
    var nameOffice = '';
    data.data.forEach(function (vote) {
      result += '\n                <tr>\n                <td data-th="Office:">' + officeSName + '</td>\n                <td data-th="Candidate:">' + vote.candidate + '</td>\n                <td data-th="Result:">' + vote.result + '</td>\n                </tr>\n                ';
      nameOffice = '<b>' + officeSName + '</b>';
    });
    document.getElementById('tableRow').innerHTML = result;
    document.getElementById('officename').innerHTML = nameOffice;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsInBheWxvYWQiLCJKU09OIiwib3BlbiIsImRvY3VtZW50Iiwib3BlbjIiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJyZXMiLCJjb25zb2xlIiwicmVzdWx0IiwiZGF0YSIsIm9mZmljZSIsImdldE9mZmljZSIsIm5hbWVPZmZpY2UiLCJ2b3RlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFFBQVFDLE9BQUFBLFlBQUFBLENBQUFBLE9BQUFBLENBQWQsT0FBY0EsQ0FBZDtBQUNBLElBQU1DLFVBQVVDLEtBQUFBLEtBQUFBLENBQVdGLE9BQUFBLElBQUFBLENBQVlELE1BQUFBLEtBQUFBLENBQUFBLEdBQUFBLEVBQXZDLENBQXVDQSxDQUFaQyxDQUFYRSxDQUFoQjtBQUNBLFNBQUEsV0FBQSxHQUF1QjtBQUNyQixNQUFJLENBQUosS0FBQSxFQUFZO0FBQ1ZGLFdBQUFBLFFBQUFBLENBQUFBLElBQUFBLEdBQUFBLHFCQUFBQTtBQUNEO0FBQ0Q7QUFDQSxNQUFJQyxRQUFBQSxPQUFBQSxJQUFKLElBQUEsRUFBNkI7QUFDM0JELFdBQUFBLFFBQUFBLENBQUFBLElBQUFBLEdBQUFBLHFCQUFBQTtBQUNEO0FBQ0Q7QUFDRDs7QUFHRCxJQUFNRyxPQUFPQyxTQUFBQSxjQUFBQSxDQUFiLFdBQWFBLENBQWI7QUFDQSxJQUFNQyxRQUFRRCxTQUFBQSxjQUFBQSxDQUFkLFlBQWNBLENBQWQ7O0FBRUEsU0FBQSxPQUFBLEdBQW1CO0FBQ2pCRCxPQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxPQUFBQTtBQUNEOztBQUVELFNBQUEsUUFBQSxHQUFvQjtBQUNsQkEsT0FBQUEsS0FBQUEsQ0FBQUEsS0FBQUEsR0FBQUEsR0FBQUE7QUFDRDs7QUFFRCxTQUFBLFFBQUEsR0FBb0I7QUFDbEJFLFFBQUFBLEtBQUFBLENBQUFBLEtBQUFBLEdBQUFBLE9BQUFBO0FBQ0Q7O0FBRUQsU0FBQSxTQUFBLEdBQXFCO0FBQ25CQSxRQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxHQUFBQTtBQUNEOztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQUEsU0FBQSxHQUFxQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUMsUUFBQUEsb0RBQUFBLEVBQTREO0FBQzFEQyxZQUQwRCxLQUFBO0FBRTFEQyxhQUFTO0FBQ1BDLGNBRE8sbUNBQUE7QUFFUCxzQkFGTyxrQkFBQTtBQUdQLHdCQUFrQlY7QUFIWDtBQUZpRCxHQUE1RE8sRUFBQUEsSUFBQUEsQ0FPUSxVQUFBLEdBQUEsRUFBQTtBQUFBLFdBQU9JLElBQVAsSUFBT0EsRUFBUDtBQVBSSixHQUFBQSxFQUFBQSxJQUFBQSxDQVFRLFVBQUEsSUFBQSxFQUFVO0FBQ2RLLFlBQUFBLEdBQUFBLENBQUFBLElBQUFBO0FBQ0EsUUFBSUMsU0FBSixFQUFBO0FBQ0FDLFNBQUFBLElBQUFBLENBQUFBLE9BQUFBLENBQWtCLFVBQUEsTUFBQSxFQUFZO0FBQzVCRCxnQkFBQUEsdUNBQytDRSxPQUQvQ0YsRUFBQUEsR0FBQUEsUUFBQUEsR0FDK0RFLE9BRC9ERixJQUFBQSxHQUFBQSxhQUFBQSxHQUN1RkUsT0FEdkZGLElBQUFBLEdBQUFBLGFBQUFBO0FBREZDLEtBQUFBO0FBSUFULGFBQUFBLGNBQUFBLENBQUFBLFlBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLE1BQUFBO0FBQ0FBLGFBQUFBLGNBQUFBLENBQUFBLFVBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLFFBQUFBO0FBQ0FBLGFBQUFBLGNBQUFBLENBQUFBLFVBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLFFBQUFBO0FBakJKRSxHQUFBQTtBQW1CRDs7QUFFRFM7O0FBRUEsU0FBQSxVQUFBLENBQUEsUUFBQSxFQUFBLFdBQUEsRUFBMkM7QUFDekNKLFVBQUFBLEdBQUFBLENBQUFBLFFBQUFBO0FBQ0FMLFFBQUFBLHVEQUFBQSxRQUFBQSxHQUFBQSxTQUFBQSxFQUE4RTtBQUM1RUMsWUFENEUsS0FBQTtBQUU1RUMsYUFBUztBQUNQQyxjQURPLG1DQUFBO0FBRVAsc0JBRk8sa0JBQUE7QUFHUCx3QkFBa0JWO0FBSFg7QUFGbUUsR0FBOUVPLEVBQUFBLElBQUFBLENBUVEsVUFBQSxHQUFBLEVBQUE7QUFBQSxXQUFPSSxJQUFQLElBQU9BLEVBQVA7QUFSUkosR0FBQUEsRUFBQUEsSUFBQUEsQ0FTUSxVQUFBLElBQUEsRUFBVTtBQUNkSyxZQUFBQSxHQUFBQSxDQUFBQSxJQUFBQTtBQUNBLFFBQUlDLFNBQUosRUFBQTtBQUNBLFFBQUlJLGFBQUosRUFBQTtBQUNBSCxTQUFBQSxJQUFBQSxDQUFBQSxPQUFBQSxDQUFrQixVQUFBLElBQUEsRUFBVTtBQUMxQkQsZ0JBQUFBLG1FQUFBQSxXQUFBQSxHQUFBQSxrREFBQUEsR0FJbUNLLEtBSm5DTCxTQUFBQSxHQUFBQSwrQ0FBQUEsR0FLZ0NLLEtBTGhDTCxNQUFBQSxHQUFBQSxnREFBQUE7QUFRQUksbUJBQUFBLFFBQUFBLFdBQUFBLEdBQUFBLE1BQUFBO0FBVEZILEtBQUFBO0FBV0FULGFBQUFBLGNBQUFBLENBQUFBLFVBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLE1BQUFBO0FBQ0FBLGFBQUFBLGNBQUFBLENBQUFBLFlBQUFBLEVBQUFBLFNBQUFBLEdBQUFBLFVBQUFBO0FBekJKRSxHQUFBQTtBQTJCRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKSB7XG4gIGlmICghdG9rZW4pIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxuICAvLyBhZG1pbiBzaG91bGQgbm90IGJlIGFibGUgdG8gYWNlc3MgdXNlciBwZXJzb25hbCBwYWdlXG4gIGlmIChwYXlsb2FkLmlzQWRtaW4gPT0gdHJ1ZSkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICB9XG4gIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG59XG5cblxuY29uc3Qgb3BlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYnKTtcbmNvbnN0IG9wZW4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215U2lkZW5hdjInKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgb3Blbi5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICBvcGVuLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5mdW5jdGlvbiBvcGVuTmF2MigpIHtcbiAgb3BlbjIuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdjIoKSB7XG4gIG9wZW4yLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5cbi8vIHVzZXJuYW1lXG4vLyBmdW5jdGlvbiB1c2VybmFtZSgpe1xuLy8gICAgIGxldCByZXN1bHQgKz1cbi8vICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQubGFzdE5hbWV9PC9hPjwvbGk+YFxuLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVyaHRtbCA9IHJlc3VsdDtcbi8vIH1cblxuLy8gdXNlcm5hbWUoKTtcblxuLy8gY29uc3VtZSBBUEkgZm9yIHJlc3VsdHNcbmZ1bmN0aW9uIGdldE9mZmljZSgpIHtcbiAgLy8gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL2NhbmRpZGF0ZXNcIiwge1xuICAvLyAgICAgbWV0aG9kOiAnR0VUJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gIC8vICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAvLyAgICAgfSxcbiAgLy8gfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAvLyAudGhlbigoZGF0YSk9PntcbiAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAvLyAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAvLyAgICAgZGF0YS5kYXRhLmZvckVhY2goKGNhbmRpZGF0ZSkgPT57XG4gIC8vICAgICAgICAgcmVzdWx0ICs9XG4gIC8vICAgICAgICAgYGBcbiAgLy8gICAgIH0pO1xuICAvLyB9KSxcblxuICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL29mZmljZXMnLCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgZGF0YS5kYXRhLmZvckVhY2goKG9mZmljZSkgPT4ge1xuICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICArPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwic2hvd1Jlc3VsdCgnJHtvZmZpY2UuaWR9JywgJyR7b2ZmaWNlLm5hbWV9JylcIj48c3Bhbj4ke29mZmljZS5uYW1lfTwvc3Bhbj48L2E+YDtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215U2lkZW5hdjInKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgIH0pO1xufVxuXG5nZXRPZmZpY2UoKTtcblxuZnVuY3Rpb24gc2hvd1Jlc3VsdChvZmZpY2VJZCwgb2ZmaWNlU05hbWUpIHtcbiAgY29uc29sZS5sb2cob2ZmaWNlSWQpO1xuICBmZXRjaChgaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL29mZmljZS8ke29mZmljZUlkfS9yZXN1bHRgLCB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuLFxuICAgIH0sXG4gIH0pXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgbGV0IG5hbWVPZmZpY2UgPSAnJztcbiAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKCh2b3RlKSA9PiB7XG4gICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICs9IGBcbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtdGg9XCJPZmZpY2U6XCI+JHtvZmZpY2VTTmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLXRoPVwiQ2FuZGlkYXRlOlwiPiR7dm90ZS5jYW5kaWRhdGV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS10aD1cIlJlc3VsdDpcIj4ke3ZvdGUucmVzdWx0fTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICBuYW1lT2ZmaWNlID0gYDxiPiR7b2ZmaWNlU05hbWV9PC9iPmA7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZVJvdycpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VuYW1lJykuaW5uZXJIVE1MID0gbmFtZU9mZmljZTtcbiAgICB9KTtcbn1cbiJdfQ==