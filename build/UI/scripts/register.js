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
    if (payload.exp >= payload.iat) {
        console.log("Token had expired!");
        window.location.href = '/views/401.html';
        setTimeout(function () {
            window.location.href = '/views/sign-in.html';
        }, 30000);
    }
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

            username = '<li><a href="#" class="active">' + payload.userName + ' ' + payload.lastName + '</a></li>';

            nameside = '<span>' + payload.userName + ' ' + payload.lastName + '</span>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcmVnaXN0ZXIuanMiXSwibmFtZXMiOlsidG9rZW4iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsInZlcmlmeVRva2VuIiwibG9jYXRpb24iLCJocmVmIiwiaXNBZG1pbiIsImV4cCIsImlhdCIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lb3V0Iiwic2lkZU5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuTmF2Iiwic3R5bGUiLCJ3aWR0aCIsImNsb3NlTmF2IiwiZ2V0QWxsIiwiUHJvbWlzZSIsImFsbCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInJlc3VsdCIsImZvckVhY2giLCJ1c2VyIiwiaWQiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsInVzZXJuYW1lIiwidXNlck5hbWUiLCJsYXN0TmFtZSIsIm5hbWVzaWRlIiwiaW5uZXJIVE1MIiwicGFydHkiLCJuYW1lIiwib2ZmaWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZ2lzdGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXNlclZhbHVlIiwicGFydHlWYWx1ZSIsIm9mZmljZVZhbHVlIiwidXNlcklkIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ2YWx1ZSIsInBhcnR5SWQiLCJwYXJ0eU5hbWUiLCJvZmZpY2VJZCIsIm9mZmljZU5hbWUiLCJyZXNwb25zZVN0YXR1cyIsImJvZHkiLCJzdHJpbmdpZnkiLCJjYW5kaWRhdGUiLCJjYW5kaWRhdGVOYW1lIiwib2siLCJjb2xvciIsImVycm9yIiwiaXNhZG1pbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FB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QUFFakJDLHdCQUFXQSxVQUZNO0FBR2pCakIsbUJBQU9jLE9BSFU7QUFJakJDLHVCQUFXQSxTQUpNO0FBS2pCTSx1QkFBV1gsTUFMTTtBQU1qQlksMkJBQWUxQjtBQU5FLFNBQWY7O0FBUG9FLEtBQTlFLEVBaUJDWCxJQWpCRCxDQWlCTSxVQUFDQyxHQUFELEVBQVM7QUFDWCxZQUFHQSxJQUFJcUMsRUFBUCxFQUFVO0FBQ05MLDZCQUFpQixJQUFqQjtBQUNBN0IsbUJBQU9VLFNBQVAsR0FBbUIsbUNBQW5CO0FBQ0FWLG1CQUFPYixLQUFQLENBQWFnRCxLQUFiLEdBQW1CLE9BQW5CO0FBQ0g7QUFDRHZELGdCQUFRQyxHQUFSLENBQVlnQixHQUFaO0FBQ0QsZUFBT0EsSUFBSUMsSUFBSixFQUFQO0FBQ0YsS0F6QkQ7QUEwQkE7QUExQkEsS0EyQkNGLElBM0JELENBMkJNLFVBQUNDLEdBQUQsRUFBUztBQUNYakIsZ0JBQVFDLEdBQVIsQ0FBWWdCLEdBQVo7QUFDQSxZQUFHLENBQUNnQyxjQUFKLEVBQW1CO0FBQ2Y3QixtQkFBT1UsU0FBUCxHQUFtQmIsSUFBSXVDLEtBQXZCO0FBQ0FwQyxtQkFBT2IsS0FBUCxDQUFhZ0QsS0FBYixHQUFtQixLQUFuQjtBQUNIO0FBQ0QsWUFBR3RDLElBQUlFLElBQUosQ0FBUyxDQUFULEVBQVlHLElBQVosQ0FBaUJtQyxPQUFqQixJQUE0QixJQUEvQixFQUFvQztBQUNoQ3ZFLG1CQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixvQkFBdkI7QUFDQztBQUNSLEtBcENEO0FBcUNIOztBQUVEO0FBQ0E7QUFDQSIsImZpbGUiOiJyZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHByb21pc2VzIH0gZnJvbSBcImZzXCI7XG5cbmxldCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmxldCBwYXlsb2FkID0gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG5mdW5jdGlvbiB2ZXJpZnlUb2tlbigpe1xuICAgIGlmKCF0b2tlbil7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBvbmx5IGFkbWluIGNhbiBhY2VzcyB0aGlzIHBhZ2VcbiAgICBpZihwYXlsb2FkLmlzQWRtaW4gPT0gZmFsc2Upe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdG9rZW4gaGFzIGV4cGlyZWRcbiAgICBpZihwYXlsb2FkLmV4cCA+PSBwYXlsb2FkLmlhdCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gaGFkIGV4cGlyZWQhXCIpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy80MDEuaHRtbCc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnOyBcbiAgICAgICAgfSwgMzAwMDApO1xuICAgIH1cbn1cblxuXG4vLyBzaWRlbmF2XG5sZXQgc2lkZU5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpO1xuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIHNpZGVOYXYuc3R5bGUud2lkdGggPSBcIjI1MHB4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIHNpZGVOYXYuc3R5bGUud2lkdGggPSBcIjBcIjtcbn1cblxuXG5mdW5jdGlvbiBnZXRBbGwoKXtcbiAgICBcblByb21pc2UuYWxsKFtcbiAgICBmZXRjaChcImh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS91c2Vyc1wiLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke3VzZXIuaWR9PiR7dXNlci5maXJzdG5hbWV9ICR7dXNlci5sYXN0bmFtZX08L29wdGlvbj4gYFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPVxuICAgICAgICAgICAgICAgIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcblxuICAgICAgICAgICAgICAgIG5hbWVzaWRlID1cbiAgICAgICAgICAgICAgICBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4gICAgfSksXG4gICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvcGFydGllc1wiLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHBhcnR5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtwYXJ0eS5pZH0+JHtwYXJ0eS5uYW1lfTwvb3B0aW9uPiBgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnRpZXMnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgfSksXG4gICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvb2ZmaWNlc1wiLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICB9LFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgob2ZmaWNlKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDxvcHRpb24gaWQ9JHtvZmZpY2UuaWR9PiR7b2ZmaWNlLm5hbWV9PC9vcHRpb24+IGBcbiAgICAgICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29mZmljZXMnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgIH0pXG4gICAgXSk7XG59XG5nZXRBbGwoKTtcblxuXG4vLyBhbGVydCgnY29ubmVjdGVkIScpO1xuLy8gZnVuY3Rpb24gZ2V0QWxsVXNlcnMoKXtcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS91c2VycycsIHtcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbi8vICAgICAgICAgaGVhZGVyczoge1xuLy8gICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuLy8gICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbi8vICAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4vLyAgICAgICAgIH0sXG4vLyAgICAgfSlcbi8vICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbi8vICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuLy8gICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHVzZXIpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke3VzZXIuaWR9PiR7dXNlci5maXJzdG5hbWV9ICR7dXNlci5sYXN0bmFtZX08L29wdGlvbj4gYFxuICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgdXNlcm5hbWUgPVxuLy8gICAgICAgICAgICAgICAgIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcblxuLy8gICAgICAgICAgICAgICAgIG5hbWVzaWRlID1cbi8vICAgICAgICAgICAgICAgICBgPHNwYW4+JHtwYXlsb2FkLnVzZXJOYW1lfSAke3BheWxvYWQubGFzdE5hbWV9PC9zcGFuPmBcblxuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbi8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4vLyAgICAgfSlcbiAgICAgICAgXG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gZ2V0QWxsUGFydGllcygpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL3BhcnRpZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChwYXJ0eSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuLy8gICAgICAgICAgICAgICAgIGBcbi8vICAgICAgICAgICAgICAgICA8b3B0aW9uIGlkPSR7cGFydHkuaWR9PiR7cGFydHkubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG4gICAgXG5cbiAgICAgICAgXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldEFsbE9mZmljZSgpe1xuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL29mZmljZXMnLCB7XG4vLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcbi8vICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbi8vICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4vLyAgICAgICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuLy8gICAgICAgICB9LFxuLy8gICAgIH0pXG4vLyAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4vLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbi8vICAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+IHtcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz1cbi8vICAgICAgICAgICAgICAgICBgXG4vLyAgICAgICAgICAgICAgICAgPG9wdGlvbiBpZD0ke29mZmljZS5pZH0+JHtvZmZpY2UubmFtZX08L29wdGlvbj4gYFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VzJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuLy8gICAgIH0pXG4gICAgXG5cbiAgICAgICAgXG4vLyB9O1xuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdCdG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlZ2lzdGVyKTtcbmNvbnNvbGUubG9nKCdnZ2dnJylcblxuZnVuY3Rpb24gcmVnaXN0ZXIoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICBsZXQgdXNlclZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJyk7XG4gICBsZXQgcGFydHlWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWVzJyk7XG4gICBsZXQgb2ZmaWNlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlcycpO1xuICAgbGV0IHVzZXJJZCA9IHVzZXJWYWx1ZS5vcHRpb25zW3VzZXJWYWx1ZS5zZWxlY3RlZEluZGV4XS5pZDtcbiAgIGxldCB1c2VyTmFtZSA9IHVzZXJWYWx1ZS5vcHRpb25zW3VzZXJWYWx1ZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgIGxldCBwYXJ0eUlkID0gcGFydHlWYWx1ZS5vcHRpb25zW3BhcnR5VmFsdWUuc2VsZWN0ZWRJbmRleF0uaWQ7XG4gICBsZXQgcGFydHlOYW1lID0gcGFydHlWYWx1ZS5vcHRpb25zW3BhcnR5VmFsdWUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICBsZXQgb2ZmaWNlSWQgPSBvZmZpY2VWYWx1ZS5vcHRpb25zW29mZmljZVZhbHVlLnNlbGVjdGVkSW5kZXhdLmlkO1xuICAgbGV0IG9mZmljZU5hbWUgPSBvZmZpY2VWYWx1ZS5vcHRpb25zW29mZmljZVZhbHVlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgbGV0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbi8vICAgIGNvbnNvbGUubG9nKHVzZXJSZWdpc3RlclZhbHVlLCBwYXJ0eVJlZ2lzdGVyVmFsdWUsIG9mZmljZVJlZ2lzdGVyVmFsdWUpO1xuXG4gICBsZXQgcmVzcG9uc2VTdGF0dXMgPSBmYWxzZTtcblxuXG4gICAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHt1c2VySWR9L3JlZ2lzdGVyYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG9mZmljZTogb2ZmaWNlSWQsXG4gICAgICAgICAgICBvZmZpY2VOYW1lOm9mZmljZU5hbWUsIFxuICAgICAgICAgICAgcGFydHk6IHBhcnR5SWQsXG4gICAgICAgICAgICBwYXJ0eU5hbWU6IHBhcnR5TmFtZSxcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogdXNlcklkLFxuICAgICAgICAgICAgY2FuZGlkYXRlTmFtZTogdXNlck5hbWVcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJDYW5kaWRhdGUgc3VjY2Vzc2Z1bGx5IHJlZ2lzdGVyZWRcIjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cImdyZWVuXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gICAgLy8gcmVuZGVyIHRoZSBwYXJ0aWVzIHBhZ2VcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGlmKCFyZXNwb25zZVN0YXR1cyl7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gcmVzLmVycm9yO1xuICAgICAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yPVwicmVkXCI7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKHJlcy5kYXRhWzBdLnVzZXIuaXNhZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICAgICAgICB9XG4gICAgfSlcbn07XG5cbi8vIGdldEFsbFVzZXJzKClcbi8vIGdldEFsbFBhcnRpZXMoKVxuLy8gZ2V0QWxsT2ZmaWNlKClcbiJdfQ==