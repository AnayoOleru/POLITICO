'use strict';

// import { promises } from "fs";

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken() {
  if (!token) {
    window.location.href = '/views/sign-in.html';
  }
  // only admin can acess this page
  if (payload.isAdmin == false) {
    window.location.href = '/views/sign-in.html';
  }
  // check if token has expired
}

// sidenav
var sideNav = document.getElementById('mySidenav');

function openNav() {
  sideNav.style.width = '250px';
}

function closeNav() {
  sideNav.style.width = '0';
}

function getAll() {
  Promise.all([fetch('https://trustpolitico.herokuapp.com/api/v1/users', {
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
    data.data.forEach(function (user) {
      result += '\n                <option id=' + user.id + '>' + user.firstname + ' ' + user.lastname + '</option> ';
    });

    document.getElementById('users').innerHTML = result;
    document.getElementById('username').innerHTML = username;
    document.getElementById('nameside').innerHTML = nameside;
  }), fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
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
    data.data.forEach(function (party) {
      result += '\n                <option id=' + party.id + '>' + party.name + '</option> ';
    });
    document.getElementById('parties').innerHTML = result;
  }), fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
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
      result += '\n            <option id=' + office.id + '>' + office.name + '</option> ';
    });
    document.getElementById('offices').innerHTML = result;
  })]);
}
getAll();

// alert('connected!');
// function getAllUsers(){
//     fetch('http://localhost:3000/api/v1/users', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((user) => {
//                 result +=
//                 `
//                 <option id=${user.id}>${user.firstname} ${user.lastname}</option> `

//                 username =
//                 `<li><a href="#" class="active">${payload.userName} ${payload.lastName}</a></li>`

//                 nameside =
//                 `<span>${payload.userName} ${payload.lastName}</span>`

//             });

//         document.getElementById('users').innerHTML = result;
//         document.getElementById('username').innerHTML = username;
//         document.getElementById('nameside').innerHTML = nameside;
//     })

// }


// function getAllParties(){
//     fetch('http://localhost:3000/api/v1/parties', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((party) => {
//                 result +=
//                 `
//                 <option id=${party.id}>${party.name}</option> `
//             });
//         document.getElementById('parties').innerHTML = result;
//     })


// }

// function getAllOffice(){
//     fetch('http://localhost:3000/api/v1/offices', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-type': 'application/json',
//             'x-access-token': token
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             let result = '';
//             data.data.forEach((office) => {
//                 result +=
//                 `
//                 <option id=${office.id}>${office.name}</option> `
//             });
//         document.getElementById('offices').innerHTML = result;
//     })


// };


document.getElementById('regBtn').addEventListener('click', register);
console.log('gggg');

function register(e) {
  e.preventDefault();

  var userValue = document.getElementById('users');
  var partyValue = document.getElementById('parties');
  var officeValue = document.getElementById('offices');
  var userId = userValue.options[userValue.selectedIndex].id;
  var userName = userValue.options[userValue.selectedIndex].value;
  var partyId = partyValue.options[partyValue.selectedIndex].id;
  var partyName = partyValue.options[partyValue.selectedIndex].value;
  var officeId = officeValue.options[officeValue.selectedIndex].id;
  var officeName = officeValue.options[officeValue.selectedIndex].value;
  var result = document.getElementById('result');
  //    console.log(userRegisterValue, partyRegisterValue, officeRegisterValue);

  var responseStatus = false;

  fetch('https://trustpolitico.herokuapp.com/api/v1/office/' + userId + '/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      office: officeId,
      officeName: officeName,
      party: partyId,
      partyName: partyName,
      candidate: userId,
      candidateName: userName
    })

  }).then(function (res) {
    if (res.ok) {
      responseStatus = true;
      result.innerHTML = 'Candidate successfully registered';
      result.style.color = 'green';
    }
    console.log(res);
    return res.json();
  })
  // render the parties page
  .then(function (res) {
    console.log(res);
    if (!responseStatus) {
      result.innerHTML = res.error;
      result.style.color = 'red';
    }
    if (res.data[0].user.isadmin == true) {
      window.location.href = '/views/signin.html';
    }
  });
}

// getAllUsers()
// getAllParties()
// getAllOffice()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcmVnaXN0ZXIuanMiXSwibmFtZXMiOlsidG9rZW4iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsInZlcmlmeVRva2VuIiwibG9jYXRpb24iLCJocmVmIiwiaXNBZG1pbiIsInNpZGVOYXYiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib3Blbk5hdiIsInN0eWxlIiwid2lkdGgiLCJjbG9zZU5hdiIsImdldEFsbCIsIlByb21pc2UiLCJhbGwiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZm9yRWFjaCIsInVzZXIiLCJpZCIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwiaW5uZXJIVE1MIiwidXNlcm5hbWUiLCJuYW1lc2lkZSIsInBhcnR5IiwibmFtZSIsIm9mZmljZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJWYWx1ZSIsInBhcnR5VmFsdWUiLCJvZmZpY2VWYWx1ZSIsInVzZXJJZCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidXNlck5hbWUiLCJ2YWx1ZSIsInBhcnR5SWQiLCJwYXJ0eU5hbWUiLCJvZmZpY2VJZCIsIm9mZmljZU5hbWUiLCJyZXNwb25zZVN0YXR1cyIsImJvZHkiLCJzdHJpbmdpZnkiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVOYW1lIiwib2siLCJjb2xvciIsImVycm9yIiwiaXNhZG1pbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFNQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFkO0FBQ0EsSUFBTUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1B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QVFDLEdBQVIsQ0FBWUosR0FBWjtBQUNBLFFBQUksQ0FBQ2lDLGNBQUwsRUFBcUI7QUFDbkI1QixhQUFPTSxTQUFQLEdBQW1CWCxJQUFJd0MsS0FBdkI7QUFDQW5DLGFBQU9oQixLQUFQLENBQWFrRCxLQUFiLEdBQXFCLEtBQXJCO0FBQ0Q7QUFDRCxRQUFJdkMsSUFBSUUsSUFBSixDQUFTLENBQVQsRUFBWUssSUFBWixDQUFpQmtDLE9BQWpCLElBQTRCLElBQWhDLEVBQXNDO0FBQ3BDcEUsYUFBT1MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsb0JBQXZCO0FBQ0Q7QUFDRixHQXBDSDtBQXFDRDs7QUFFRDtBQUNBO0FBQ0EiLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBwcm9taXNlcyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCkge1xuICBpZiAoIXRva2VuKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gIH1cbiAgLy8gb25seSBhZG1pbiBjYW4gYWNlc3MgdGhpcyBwYWdlXG4gIGlmIChwYXlsb2FkLmlzQWRtaW4gPT0gZmFsc2UpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgfVxuICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxufVxuXG5cbi8vIHNpZGVuYXZcbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlTaWRlbmF2Jyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gIHNpZGVOYXYuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgc2lkZU5hdi5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuXG5mdW5jdGlvbiBnZXRBbGwoKSB7XG4gIFByb21pc2UuYWxsKFtcbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3VzZXJzJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgKz0gYFxuICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHt1c2VyLmlkfT4ke3VzZXIuZmlyc3RuYW1lfSAke3VzZXIubGFzdG5hbWV9PC9vcHRpb24+IGA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VycycpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgICAgfSksXG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9wYXJ0aWVzJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICs9IGBcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L29wdGlvbj4gYDtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgfSksXG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2VzJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+IHtcbiAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICs9IGBcbiAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtvZmZpY2UuaWR9PiR7b2ZmaWNlLm5hbWV9PC9vcHRpb24+IGA7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlcycpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgIH0pLFxuICBdKTtcbn1cbmdldEFsbCgpO1xuXG5cbi8vIGFsZXJ0KCdjb25uZWN0ZWQhJyk7XG4vLyBmdW5jdGlvbiBnZXRBbGxVc2Vycygpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL3VzZXJzJywge1xuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4vLyAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuLy8gICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbi8vICAgICAgICAgfSxcbi8vICAgICB9KVxuLy8gICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuLy8gICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4vLyAgICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgodXNlcikgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuLy8gICAgICAgICAgICAgICAgIGBcbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7dXNlci5pZH0+JHt1c2VyLmZpcnN0bmFtZX0gJHt1c2VyLmxhc3RuYW1lfTwvb3B0aW9uPiBgXG5cbi8vICAgICAgICAgICAgICAgICB1c2VybmFtZSA9XG4vLyAgICAgICAgICAgICAgICAgYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9hPjwvbGk+YFxuXG4vLyAgICAgICAgICAgICAgICAgbmFtZXNpZGUgPVxuLy8gICAgICAgICAgICAgICAgIGA8c3Bhbj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L3NwYW4+YFxuXG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcnMnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbi8vICAgICB9KVxuXG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gZ2V0QWxsUGFydGllcygpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL3BhcnRpZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuLy8gICAgICAgICAgICAgICAgIGBcbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG5cblxuXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldEFsbE9mZmljZSgpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL29mZmljZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke29mZmljZS5pZH0+JHtvZmZpY2UubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG5cblxuXG4vLyB9O1xuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdCdG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlZ2lzdGVyKTtcbmNvbnNvbGUubG9nKCdnZ2dnJyk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHVzZXJWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VycycpO1xuICBjb25zdCBwYXJ0eVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnRpZXMnKTtcbiAgY29uc3Qgb2ZmaWNlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlcycpO1xuICBjb25zdCB1c2VySWQgPSB1c2VyVmFsdWUub3B0aW9uc1t1c2VyVmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gIGNvbnN0IHVzZXJOYW1lID0gdXNlclZhbHVlLm9wdGlvbnNbdXNlclZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICBjb25zdCBwYXJ0eUlkID0gcGFydHlWYWx1ZS5vcHRpb25zW3BhcnR5VmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gIGNvbnN0IHBhcnR5TmFtZSA9IHBhcnR5VmFsdWUub3B0aW9uc1twYXJ0eVZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICBjb25zdCBvZmZpY2VJZCA9IG9mZmljZVZhbHVlLm9wdGlvbnNbb2ZmaWNlVmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gIGNvbnN0IG9mZmljZU5hbWUgPSBvZmZpY2VWYWx1ZS5vcHRpb25zW29mZmljZVZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XG4gIC8vICAgIGNvbnNvbGUubG9nKHVzZXJSZWdpc3RlclZhbHVlLCBwYXJ0eVJlZ2lzdGVyVmFsdWUsIG9mZmljZVJlZ2lzdGVyVmFsdWUpO1xuXG4gIGxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuXG5cbiAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHt1c2VySWR9L3JlZ2lzdGVyYCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW4sXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBvZmZpY2U6IG9mZmljZUlkLFxuICAgICAgb2ZmaWNlTmFtZSxcbiAgICAgIHBhcnR5OiBwYXJ0eUlkLFxuICAgICAgcGFydHlOYW1lLFxuICAgICAgY2FuZGlkYXRlOiB1c2VySWQsXG4gICAgICBjYW5kaWRhdGVOYW1lOiB1c2VyTmFtZSxcbiAgICB9KSxcblxuICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gJ0NhbmRpZGF0ZSBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCc7XG4gICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvciA9ICdncmVlbic7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAvLyByZW5kZXIgdGhlIHBhcnRpZXMgcGFnZVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICBpZiAoIXJlc3BvbnNlU3RhdHVzKSB7XG4gICAgICAgIHJlc3VsdC5pbm5lckhUTUwgPSByZXMuZXJyb3I7XG4gICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgICAgfVxuICAgICAgaWYgKHJlcy5kYXRhWzBdLnVzZXIuaXNhZG1pbiA9PSB0cnVlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbi8vIGdldEFsbFVzZXJzKClcbi8vIGdldEFsbFBhcnRpZXMoKVxuLy8gZ2V0QWxsT2ZmaWNlKClcbiJdfQ==