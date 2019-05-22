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
var sideNav = document.getElementById("mySidenav");

function openNav() {
    sideNav.style.width = "250px";
}

function closeNav() {
    sideNav.style.width = "0";
}

function getAll() {

    Promise.all([fetch("https://trustpolitico.herokuapp.com/api/v1/users", {
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
        data.data.forEach(function (user) {
            result += '\n                <option id=' + user.id + '>' + user.firstname + ' ' + user.lastname + '</option> ';
        });

        document.getElementById('users').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    }), fetch("https://trustpolitico.herokuapp.com/api/v1/parties", {
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
            result += '\n                <option id=' + party.id + '>' + party.name + '</option> ';
        });
        document.getElementById('parties').innerHTML = result;
    }), fetch("https://trustpolitico.herokuapp.com/api/v1/offices", {
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
            'Accept': 'application/json, text/plain, */*',
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
            result.innerHTML = "Candidate successfully registered";
            result.style.color = "green";
        }
        console.log(res);
        return res.json();
    })
    // render the parties page
    .then(function (res) {
        console.log(res);
        if (!responseStatus) {
            result.innerHTML = res.error;
            result.style.color = "red";
        }
        if (res.data[0].user.isadmin == true) {
            window.location.href = '/views/signin.html';
        }
    });
};

// getAllUsers()
// getAllParties()
// getAllOffice()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcmVnaXN0ZXIuanMiXSwibmFtZXMiOlsidG9rZW4iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsInZlcmlmeVRva2VuIiwibG9jYXRpb24iLCJocmVmIiwiaXNBZG1pbiIsInNpZGVOYXYiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib3Blbk5hdiIsInN0eWxlIiwid2lkdGgiLCJjbG9zZU5hdiIsImdldEFsbCIsIlByb21pc2UiLCJhbGwiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZm9yRWFjaCIsInVzZXIiLCJpZCIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwiaW5uZXJIVE1MIiwidXNlcm5hbWUiLCJuYW1lc2lkZSIsInBhcnR5IiwibmFtZSIsIm9mZmljZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJWYWx1ZSIsInBhcnR5VmFsdWUiLCJvZmZpY2VWYWx1ZSIsInVzZXJJZCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidXNlck5hbWUiLCJ2YWx1ZSIsInBhcnR5SWQiLCJwYXJ0eU5hbWUiLCJvZmZpY2VJZCIsIm9mZmljZU5hbWUiLCJyZXNwb25zZVN0YXR1cyIsImJvZHkiLCJzdHJpbmdpZnkiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVOYW1lIiwib2siLCJjb2xvciIsImVycm9yIiwiaXNhZG1pbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4s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O0FBMUJBLEtBMkJDRixJQTNCRCxDQTJCTSxVQUFDQyxHQUFELEVBQVM7QUFDWEcsZ0JBQVFDLEdBQVIsQ0FBWUosR0FBWjtBQUNBLFlBQUcsQ0FBQ2lDLGNBQUosRUFBbUI7QUFDZjVCLG1CQUFPTSxTQUFQLEdBQW1CWCxJQUFJd0MsS0FBdkI7QUFDQW5DLG1CQUFPZixLQUFQLENBQWFpRCxLQUFiLEdBQW1CLEtBQW5CO0FBQ0g7QUFDRCxZQUFHdkMsSUFBSUUsSUFBSixDQUFTLENBQVQsRUFBWUssSUFBWixDQUFpQmtDLE9BQWpCLElBQTRCLElBQS9CLEVBQW9DO0FBQ2hDbkUsbUJBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLG9CQUF2QjtBQUNDO0FBQ1IsS0FwQ0Q7QUFxQ0g7O0FBRUQ7QUFDQTtBQUNBIiwiZmlsZSI6InJlZ2lzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgcHJvbWlzZXMgfSBmcm9tIFwiZnNcIjtcblxubGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgaWYoIXRva2VuKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIG9ubHkgYWRtaW4gY2FuIGFjZXNzIHRoaXMgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSBmYWxzZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxufVxuXG5cbi8vIHNpZGVuYXZcbmxldCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIik7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgc2lkZU5hdi5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgc2lkZU5hdi5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5cbmZ1bmN0aW9uIGdldEFsbCgpe1xuICAgIFxuUHJvbWlzZS5hbGwoW1xuICAgIGZldGNoKFwiaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3VzZXJzXCIsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7dXNlci5pZH0+JHt1c2VyLmZpcnN0bmFtZX0gJHt1c2VyLmxhc3RuYW1lfTwvb3B0aW9uPiBgXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VycycpLmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuICAgIH0pLFxuICAgIGZldGNoKFwiaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL3BhcnRpZXNcIiwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L29wdGlvbj4gYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgIH0pLFxuICAgIGZldGNoKFwiaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL29mZmljZXNcIiwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKG9mZmljZSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgICAgICBgXG4gICAgICAgICAgICA8b3B0aW9uIGlkPSR7b2ZmaWNlLmlkfT4ke29mZmljZS5uYW1lfTwvb3B0aW9uPiBgXG4gICAgICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICB9KVxuICAgIF0pO1xufVxuZ2V0QWxsKCk7XG5cblxuLy8gYWxlcnQoJ2Nvbm5lY3RlZCEnKTtcbi8vIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCl7XG4vLyAgICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjEvdXNlcnMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKCh1c2VyKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4vLyAgICAgICAgICAgICAgICAgYFxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHt1c2VyLmlkfT4ke3VzZXIuZmlyc3RuYW1lfSAke3VzZXIubGFzdG5hbWV9PC9vcHRpb24+IGBcbiAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgIHVzZXJuYW1lID1cbi8vICAgICAgICAgICAgICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gXG5cbi8vICAgICAgICAgICAgICAgICBuYW1lc2lkZSA9XG4vLyAgICAgICAgICAgICAgICAgYDxzcGFuPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvc3Bhbj5gXG5cbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VycycpLmlubmVySFRNTCA9IHJlc3VsdDtcbi8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lc2lkZScpLmlubmVySFRNTCA9IG5hbWVzaWRlO1xuLy8gICAgIH0pXG4gICAgICAgIFxuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGdldEFsbFBhcnRpZXMoKXtcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9wYXJ0aWVzJywge1xuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4vLyAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuLy8gICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbi8vICAgICAgICAgfSxcbi8vICAgICB9KVxuLy8gICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuLy8gICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4vLyAgICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgocGFydHkpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke3BhcnR5LmlkfT4ke3BhcnR5Lm5hbWV9PC9vcHRpb24+IGBcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydGllcycpLmlubmVySFRNTCA9IHJlc3VsdDtcbi8vICAgICB9KVxuICAgIFxuXG4gICAgICAgIFxuLy8gfVxuXG4vLyBmdW5jdGlvbiBnZXRBbGxPZmZpY2UoKXtcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9vZmZpY2VzJywge1xuLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4vLyAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuLy8gICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbi8vICAgICAgICAgfSxcbi8vICAgICB9KVxuLy8gICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuLy8gICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4vLyAgICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgob2ZmaWNlKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4vLyAgICAgICAgICAgICAgICAgYFxuLy8gICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtvZmZpY2UuaWR9PiR7b2ZmaWNlLm5hbWV9PC9vcHRpb24+IGBcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlcycpLmlubmVySFRNTCA9IHJlc3VsdDtcbi8vICAgICB9KVxuICAgIFxuXG4gICAgICAgIFxuLy8gfTtcblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnQnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZWdpc3Rlcik7XG5jb25zb2xlLmxvZygnZ2dnZycpXG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgbGV0IHVzZXJWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VycycpO1xuICAgbGV0IHBhcnR5VmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydGllcycpO1xuICAgbGV0IG9mZmljZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29mZmljZXMnKTtcbiAgIGxldCB1c2VySWQgPSB1c2VyVmFsdWUub3B0aW9uc1t1c2VyVmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gICBsZXQgdXNlck5hbWUgPSB1c2VyVmFsdWUub3B0aW9uc1t1c2VyVmFsdWUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICBsZXQgcGFydHlJZCA9IHBhcnR5VmFsdWUub3B0aW9uc1twYXJ0eVZhbHVlLnNlbGVjdGVkSW5kZXhdLmlkO1xuICAgbGV0IHBhcnR5TmFtZSA9IHBhcnR5VmFsdWUub3B0aW9uc1twYXJ0eVZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgbGV0IG9mZmljZUlkID0gb2ZmaWNlVmFsdWUub3B0aW9uc1tvZmZpY2VWYWx1ZS5zZWxlY3RlZEluZGV4XS5pZDtcbiAgIGxldCBvZmZpY2VOYW1lID0gb2ZmaWNlVmFsdWUub3B0aW9uc1tvZmZpY2VWYWx1ZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgIGxldCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XG4vLyAgICBjb25zb2xlLmxvZyh1c2VyUmVnaXN0ZXJWYWx1ZSwgcGFydHlSZWdpc3RlclZhbHVlLCBvZmZpY2VSZWdpc3RlclZhbHVlKTtcblxuICAgbGV0IHJlc3BvbnNlU3RhdHVzID0gZmFsc2U7XG5cblxuICAgIGZldGNoKGBodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvb2ZmaWNlLyR7dXNlcklkfS9yZWdpc3RlcmAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBvZmZpY2U6IG9mZmljZUlkLFxuICAgICAgICAgICAgb2ZmaWNlTmFtZTpvZmZpY2VOYW1lLCBcbiAgICAgICAgICAgIHBhcnR5OiBwYXJ0eUlkLFxuICAgICAgICAgICAgcGFydHlOYW1lOiBwYXJ0eU5hbWUsXG4gICAgICAgICAgICBjYW5kaWRhdGU6IHVzZXJJZCxcbiAgICAgICAgICAgIGNhbmRpZGF0ZU5hbWU6IHVzZXJOYW1lXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMub2spe1xuICAgICAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IFwiQ2FuZGlkYXRlIHN1Y2Nlc3NmdWxseSByZWdpc3RlcmVkXCI7XG4gICAgICAgICAgICByZXN1bHQuc3R5bGUuY29sb3I9XCJncmVlblwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIHJlbmRlciB0aGUgcGFydGllcyBwYWdlXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cInJlZFwiO1xuICAgICAgICB9IFxuICAgICAgICBpZihyZXMuZGF0YVswXS51c2VyLmlzYWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbmluLmh0bWwnO1xuICAgICAgICAgICAgfVxuICAgIH0pXG59O1xuXG4vLyBnZXRBbGxVc2VycygpXG4vLyBnZXRBbGxQYXJ0aWVzKClcbi8vIGdldEFsbE9mZmljZSgpXG4iXX0=