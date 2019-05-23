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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3BlbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuMiIsIm9wZW5OYXYiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJvcGVuTmF2MiIsImNsb3NlTmF2MiIsImdldE9mZmljZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwib2ZmaWNlIiwiaWQiLCJuYW1lIiwiaW5uZXJIVE1MIiwidXNlcm5hbWUiLCJuYW1lc2lkZSIsInNob3dSZXN1bHQiLCJvZmZpY2VJZCIsIm9mZmljZVNOYW1lIiwibmFtZU9mZmljZSIsInZvdGUiLCJjYW5kaWRhdGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsUUFBUUMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsQ0FBZDtBQUNBLElBQU1DLFVBQVVDLEtBQUtDLEtBQUwsQ0FBV0wsT0FBT00sSUFBUCxDQUFZUCxNQUFNUSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFaLENBQVgsQ0FBaEI7QUFDQSxTQUFTQyxXQUFULEdBQXVCO0FBQ3JCLE1BQUksQ0FBQ1QsS0FBTCxFQUFZO0FBQ1ZDLFdBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHFCQUF2QjtBQUNEO0FBQ0Q7QUFDQSxNQUFJUCxRQUFRUSxPQUFSLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCWCxXQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDRDtBQUNEO0FBQ0Q7O0FBR0QsSUFBTUUsT0FBT0MsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixDQUFiO0FBQ0EsSUFBTUMsUUFBUUYsU0FBU0MsY0FBVCxDQUF3QixZQUF4QixDQUFkOztBQUVBLFNBQVNFLE9BQVQsR0FBbUI7QUFDakJKLE9BQUtLLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixPQUFuQjtBQUNEOztBQUVELFNBQVNDLFFBQVQsR0FBb0I7QUFDbEJQLE9BQUtLLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixHQUFuQjtBQUNEOztBQUVELFNBQVNFLFFBQVQsR0FBb0I7QUFDbEJMLFFBQU1FLEtBQU4sQ0FBWUMsS0FBWixHQUFvQixPQUFwQjtBQUNEOztBQUVELFNBQVNHLFNBQVQsR0FBcUI7QUFDbkJOLFFBQU1FLEtBQU4sQ0FBWUMsS0FBWixHQUFvQixHQUFwQjtBQUNEOztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVNJLFNBQVQsR0FBcUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFDLFFBQU0sb0RBQU4sRUFBNEQ7QUFDMURDLFlBQVEsS0FEa0Q7QUFFMURDLGFBQVM7QUFDUEMsY0FBUSxtQ0FERDtBQUVQLHNCQUFnQixrQkFGVDtBQUdQLHdCQUFrQjNCO0FBSFg7QUFGaUQsR0FBNUQsRUFPRzRCLElBUEgsQ0FPUTtBQUFBLFdBQU9DLElBQUlDLElBQUosRUFBUDtBQUFBLEdBUFIsRUFRR0YsSUFSSCxDQVFRLFVBQUNHLElBQUQsRUFBVTtBQUNkQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDQSxRQUFJRyxTQUFTLEVBQWI7QUFDQUgsU0FBS0EsSUFBTCxDQUFVSSxPQUFWLENBQWtCLFVBQUNDLE1BQUQsRUFBWTtBQUM1QkYsdURBQytDRSxPQUFPQyxFQUR0RCxjQUMrREQsT0FBT0UsSUFEdEUsbUJBQ3VGRixPQUFPRSxJQUQ5RjtBQUVELEtBSEQ7QUFJQXhCLGFBQVNDLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0N3QixTQUF0QyxHQUFrREwsTUFBbEQ7QUFDQXBCLGFBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0N3QixTQUFwQyxHQUFnREMsUUFBaEQ7QUFDQTFCLGFBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0N3QixTQUFwQyxHQUFnREUsUUFBaEQ7QUFDRCxHQWxCSDtBQW1CRDs7QUFFRGxCOztBQUVBLFNBQVNtQixVQUFULENBQW9CQyxRQUFwQixFQUE4QkMsV0FBOUIsRUFBMkM7QUFDekNaLFVBQVFDLEdBQVIsQ0FBWVUsUUFBWjtBQUNBbkIsK0RBQTJEbUIsUUFBM0QsY0FBOEU7QUFDNUVsQixZQUFRLEtBRG9FO0FBRTVFQyxhQUFTO0FBQ1BDLGNBQVEsbUNBREQ7QUFFUCxzQkFBZ0Isa0JBRlQ7QUFHUCx3QkFBa0IzQjtBQUhYO0FBRm1FLEdBQTlFLEVBUUc0QixJQVJILENBUVE7QUFBQSxXQUFPQyxJQUFJQyxJQUFKLEVBQVA7QUFBQSxHQVJSLEVBU0dGLElBVEgsQ0FTUSxVQUFDRyxJQUFELEVBQVU7QUFDZEMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0EsUUFBSUcsU0FBUyxFQUFiO0FBQ0EsUUFBSVcsYUFBYSxFQUFqQjtBQUNBZCxTQUFLQSxJQUFMLENBQVVJLE9BQVYsQ0FBa0IsVUFBQ1csSUFBRCxFQUFVO0FBQzFCWixtRkFHZ0NVLFdBSGhDLHdEQUltQ0UsS0FBS0MsU0FKeEMscURBS2dDRCxLQUFLWixNQUxyQztBQVFBVywyQkFBbUJELFdBQW5CO0FBQ0QsS0FWRDtBQVdBOUIsYUFBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ3dCLFNBQXBDLEdBQWdETCxNQUFoRDtBQUNBcEIsYUFBU0MsY0FBVCxDQUF3QixZQUF4QixFQUFzQ3dCLFNBQXRDLEdBQWtETSxVQUFsRDtBQUNELEdBMUJIO0FBMkJEIiwiZmlsZSI6Imhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCkge1xuICBpZiAoIXRva2VuKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gIH1cbiAgLy8gYWRtaW4gc2hvdWxkIG5vdCBiZSBhYmxlIHRvIGFjZXNzIHVzZXIgcGVyc29uYWwgcGFnZVxuICBpZiAocGF5bG9hZC5pc0FkbWluID09IHRydWUpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxuICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxufVxuXG5cbmNvbnN0IG9wZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlTaWRlbmF2Jyk7XG5jb25zdCBvcGVuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYyJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gIG9wZW4uc3R5bGUud2lkdGggPSAnMjAwcHgnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgb3Blbi5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuZnVuY3Rpb24gb3Blbk5hdjIoKSB7XG4gIG9wZW4yLnN0eWxlLndpZHRoID0gJzIwMHB4Jztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYyKCkge1xuICBvcGVuMi5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuXG4vLyB1c2VybmFtZVxuLy8gZnVuY3Rpb24gdXNlcm5hbWUoKXtcbi8vICAgICBsZXQgcmVzdWx0ICs9XG4vLyAgICAgYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+JHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lcmh0bWwgPSByZXN1bHQ7XG4vLyB9XG5cbi8vIHVzZXJuYW1lKCk7XG5cbi8vIGNvbnN1bWUgQVBJIGZvciByZXN1bHRzXG5mdW5jdGlvbiBnZXRPZmZpY2UoKSB7XG4gIC8vIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9jYW5kaWRhdGVzXCIsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0dFVCcsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAvLyAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgLy8gICAgIH0sXG4gIC8vIH0pLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLy8gLnRoZW4oKGRhdGEpPT57XG4gIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgLy8gICAgIGxldCByZXN1bHQgPSAnJztcbiAgLy8gICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+e1xuICAvLyAgICAgICAgIHJlc3VsdCArPVxuICAvLyAgICAgICAgIGBgXG4gIC8vICAgICB9KTtcbiAgLy8gfSksXG5cbiAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2VzJywge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlbixcbiAgICB9LFxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+IHtcbiAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgKz0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cInNob3dSZXN1bHQoJyR7b2ZmaWNlLmlkfScsICcke29mZmljZS5uYW1lfScpXCI+PHNwYW4+JHtvZmZpY2UubmFtZX08L3NwYW4+PC9hPmA7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYyJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KTtcbn1cblxuZ2V0T2ZmaWNlKCk7XG5cbmZ1bmN0aW9uIHNob3dSZXN1bHQob2ZmaWNlSWQsIG9mZmljZVNOYW1lKSB7XG4gIGNvbnNvbGUubG9nKG9mZmljZUlkKTtcbiAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHtvZmZpY2VJZH0vcmVzdWx0YCwge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlbixcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgIGxldCBuYW1lT2ZmaWNlID0gJyc7XG4gICAgICBkYXRhLmRhdGEuZm9yRWFjaCgodm90ZSkgPT4ge1xuICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICArPSBgXG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLXRoPVwiT2ZmaWNlOlwiPiR7b2ZmaWNlU05hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS10aD1cIkNhbmRpZGF0ZTpcIj4ke3ZvdGUuY2FuZGlkYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtdGg9XCJSZXN1bHQ6XCI+JHt2b3RlLnJlc3VsdH08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgbmFtZU9mZmljZSA9IGA8Yj4ke29mZmljZVNOYW1lfTwvYj5gO1xuICAgICAgfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGVSb3cnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlbmFtZScpLmlubmVySFRNTCA9IG5hbWVPZmZpY2U7XG4gICAgfSk7XG59XG4iXX0=