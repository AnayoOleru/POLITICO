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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcmVnaXN0ZXIuanMiXSwibmFtZXMiOlsidG9rZW4iLCJ3aW5kb3ciLCJwYXlsb2FkIiwiSlNPTiIsInNpZGVOYXYiLCJkb2N1bWVudCIsIlByb21pc2UiLCJtZXRob2QiLCJoZWFkZXJzIiwicmVzIiwiY29uc29sZSIsInJlc3VsdCIsImRhdGEiLCJ1c2VyIiwicGFydHkiLCJvZmZpY2UiLCJnZXRBbGwiLCJlIiwidXNlclZhbHVlIiwicGFydHlWYWx1ZSIsIm9mZmljZVZhbHVlIiwidXNlcklkIiwidXNlck5hbWUiLCJwYXJ0eUlkIiwicGFydHlOYW1lIiwib2ZmaWNlSWQiLCJvZmZpY2VOYW1lIiwicmVzcG9uc2VTdGF0dXMiLCJmZXRjaCIsImJvZHkiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVOYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUlBLFFBQVFDLE9BQUFBLFlBQUFBLENBQUFBLE9BQUFBLENBQVosT0FBWUEsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUFBLEtBQUFBLENBQVdGLE9BQUFBLElBQUFBLENBQVlELE1BQUFBLEtBQUFBLENBQUFBLEdBQUFBLEVBQXJDLENBQXFDQSxDQUFaQyxDQUFYRSxDQUFkO0FBQ0EsU0FBQSxXQUFBLEdBQXNCO0FBQ2xCLFFBQUcsQ0FBSCxLQUFBLEVBQVU7QUFDTkYsZUFBQUEsUUFBQUEsQ0FBQUEsSUFBQUEsR0FBQUEscUJBQUFBO0FBQ0g7QUFDRDtBQUNBLFFBQUdDLFFBQUFBLE9BQUFBLElBQUgsS0FBQSxFQUE0QjtBQUN4QkQsZUFBQUEsUUFBQUEsQ0FBQUEsSUFBQUEsR0FBQUEscUJBQUFBO0FBQ0g7QUFDRDtBQUNIOztBQUdEO0FBQ0EsSUFBSUcsVUFBVUMsU0FBQUEsY0FBQUEsQ0FBZCxXQUFjQSxDQUFkOztBQUVBLFNBQUEsT0FBQSxHQUFtQjtBQUNmRCxZQUFBQSxLQUFBQSxDQUFBQSxLQUFBQSxHQUFBQSxPQUFBQTtBQUNIOztBQUVELFNBQUEs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QkFBQUEsUUFBQUEsQ0FBQUEsSUFBQUEsR0FBQUEsb0JBQUFBO0FBQ0M7QUFuQ1QyQixLQUFBQTtBQXFDSDs7QUFFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBwcm9taXNlcyB9IGZyb20gXCJmc1wiO1xuXG5sZXQgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5sZXQgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKXtcbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gb25seSBhZG1pbiBjYW4gYWNlc3MgdGhpcyBwYWdlXG4gICAgaWYocGF5bG9hZC5pc0FkbWluID09IGZhbHNlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG59XG5cblxuLy8gc2lkZW5hdlxubGV0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBzaWRlTmF2LnN0eWxlLndpZHRoID0gXCIyNTBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBzaWRlTmF2LnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cblxuZnVuY3Rpb24gZ2V0QWxsKCl7XG4gICAgXG5Qcm9taXNlLmFsbChbXG4gICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvdXNlcnNcIiwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHt1c2VyLmlkfT4ke3VzZXIuZmlyc3RuYW1lfSAke3VzZXIubGFzdG5hbWV9PC9vcHRpb24+IGBcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4gICAgfSksXG4gICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllc1wiLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHBhcnR5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtwYXJ0eS5pZH0+JHtwYXJ0eS5uYW1lfTwvb3B0aW9uPiBgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnRpZXMnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgfSksXG4gICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvb2ZmaWNlc1wiLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgob2ZmaWNlKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtvZmZpY2UuaWR9PiR7b2ZmaWNlLm5hbWV9PC9vcHRpb24+IGBcbiAgICAgICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29mZmljZXMnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgIH0pXG4gICAgXSk7XG59XG5nZXRBbGwoKTtcblxuXG4vLyBhbGVydCgnY29ubmVjdGVkIScpO1xuLy8gZnVuY3Rpb24gZ2V0QWxsVXNlcnMoKXtcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS91c2VycycsIHtcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuLy8gICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbi8vICAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4vLyAgICAgICAgIH0sXG4vLyAgICAgfSlcbi8vICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbi8vICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuLy8gICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHVzZXIpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke3VzZXIuaWR9PiR7dXNlci5maXJzdG5hbWV9ICR7dXNlci5sYXN0bmFtZX08L29wdGlvbj4gYFxuICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgdXNlcm5hbWUgPVxuLy8gICAgICAgICAgICAgICAgIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcblxuLy8gICAgICAgICAgICAgICAgIG5hbWVzaWRlID1cbi8vICAgICAgICAgICAgICAgICBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcblxuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbi8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4vLyAgICAgfSlcbiAgICAgICAgXG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gZ2V0QWxsUGFydGllcygpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL3BhcnRpZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuLy8gICAgICAgICAgICAgICAgIGBcbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG4gICAgXG5cbiAgICAgICAgXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldEFsbE9mZmljZSgpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL29mZmljZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke29mZmljZS5pZH0+JHtvZmZpY2UubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG4gICAgXG5cbiAgICAgICAgXG4vLyB9O1xuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdCdG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlZ2lzdGVyKTtcbmNvbnNvbGUubG9nKCdnZ2dnJylcblxuZnVuY3Rpb24gcmVnaXN0ZXIoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICBsZXQgdXNlclZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJyk7XG4gICBsZXQgcGFydHlWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJyk7XG4gICBsZXQgb2ZmaWNlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlcycpO1xuICAgbGV0IHVzZXJJZCA9IHVzZXJWYWx1ZS5vcHRpb25zW3VzZXJWYWx1ZS5zZWxlY3RlZEluZGV4XS5pZDtcbiAgIGxldCB1c2VyTmFtZSA9IHVzZXJWYWx1ZS5vcHRpb25zW3VzZXJWYWx1ZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgIGxldCBwYXJ0eUlkID0gcGFydHlWYWx1ZS5vcHRpb25zW3BhcnR5VmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gICBsZXQgcGFydHlOYW1lID0gcGFydHlWYWx1ZS5vcHRpb25zW3BhcnR5VmFsdWUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICBsZXQgb2ZmaWNlSWQgPSBvZmZpY2VWYWx1ZS5vcHRpb25zW29mZmljZVZhbHVlLnNlbGVjdGVkSW5kZXhdLmlkO1xuICAgbGV0IG9mZmljZU5hbWUgPSBvZmZpY2VWYWx1ZS5vcHRpb25zW29mZmljZVZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgbGV0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbi8vICAgIGNvbnNvbGUubG9nKHVzZXJSZWdpc3RlclZhbHVlLCBwYXJ0eVJlZ2lzdGVyVmFsdWUsIG9mZmljZVJlZ2lzdGVyVmFsdWUpO1xuXG4gICBsZXQgcmVzcG9uc2VTdGF0dXMgPSBmYWxzZTtcblxuXG4gICAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHt1c2VySWR9L3JlZ2lzdGVyYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG9mZmljZTogb2ZmaWNlSWQsXG4gICAgICAgICAgICBvZmZpY2VOYW1lOm9mZmljZU5hbWUsIFxuICAgICAgICAgICAgcGFydHk6IHBhcnR5SWQsXG4gICAgICAgICAgICBwYXJ0eU5hbWU6IHBhcnR5TmFtZSxcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogdXNlcklkLFxuICAgICAgICAgICAgY2FuZGlkYXRlTmFtZTogdXNlck5hbWVcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJDYW5kaWRhdGUgc3VjY2Vzc2Z1bGx5IHJlZ2lzdGVyZWRcIjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cImdyZWVuXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gICAgLy8gcmVuZGVyIHRoZSBwYXJ0aWVzIHBhZ2VcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGlmKCFyZXNwb25zZVN0YXR1cyl7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gcmVzLmVycm9yO1xuICAgICAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yPVwicmVkXCI7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKHJlcy5kYXRhWzBdLnVzZXIuaXNhZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICAgICAgICB9XG4gICAgfSlcbn07XG5cbi8vIGdldEFsbFVzZXJzKClcbi8vIGdldEFsbFBhcnRpZXMoKVxuLy8gZ2V0QWxsT2ZmaWNlKClcbiJdfQ==