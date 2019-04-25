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
    if (payload.exp >= payload.iat) {
        console.log("Token had expired!");
        window.location.href = '/views/401.html';
        setTimeout(function () {
            window.location.href = '/views/sign-in.html';
        }, 30000);
    }
}

var open = document.getElementById("mySidenav");
var open2 = document.getElementById("mySidenav2");

function openNav() {
    open.style.width = "200px";
}

function closeNav() {
    open.style.width = "0";
}

function openNav2() {
    open2.style.width = "200px";
}

function closeNav2() {
    open2.style.width = "0";
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

    fetch("https://trustpolitico.herokuapp.com/api/v1/offices", {
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
            result += '<a href="#" onclick="showResult(\'' + office.id + '\', \'' + office.name + '\')"><span>' + office.name + '</span></a>';

            username = '<li><a href="#" class="active" style="font-size:20px;">' + payload.userName + ' ' + payload.lastName + '</a></li>';

            nameside = '<span>' + payload.userName + ' ' + payload.lastName + '</span>';
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
            'Accept': 'application/json, text/plain, */*',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwiZXhwIiwiaWF0IiwiY29uc29sZSIsImxvZyIsInNldFRpbWVvdXQiLCJvcGVuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9wZW4yIiwib3Blbk5hdiIsInN0eWxlIiwid2lkdGgiLCJjbG9zZU5hdiIsIm9wZW5OYXYyIiwiY2xvc2VOYXYyIiwiZ2V0T2ZmaWNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVzdWx0IiwiZm9yRWFjaCIsIm9mZmljZSIsImlkIiwibmFtZSIsInVzZXJuYW1lIiwidXNlck5hbWUiLCJsYXN0TmFtZSIsIm5hbWVzaWRlIiwiaW5uZXJIVE1MIiwic2hvd1Jlc3VsdCIsIm9mZmljZUlkIiwib2ZmaWNlU05hbWUiLCJuYW1lT2ZmaWNlIiwidm90ZSIsImNhbmRpZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixDQUFaO0FBQ0EsSUFBSUMsVUFBVUMsS0FBS0MsS0FBTCxDQUFXTCxPQUFPTSxJQUFQLENBQVlQLE1BQU1RLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQVosQ0FBWCxDQUFkO0FBQ0EsU0FBU0MsV0FBVCxHQUFzQjtBQUNsQixRQUFHLENBQUNULEtBQUosRUFBVTtBQUNOQyxlQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDSDtBQUNEO0FBQ0EsUUFBR1AsUUFBUVEsT0FBUixJQUFtQixJQUF0QixFQUEyQjtBQUN2QlgsZUFBT1MsUUFBUCxD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U0FBUyxFQUFiO0FBQ0EsWUFBSWEsYUFBYSxFQUFqQjtBQUNBZCxhQUFLQSxJQUFMLENBQVVFLE9BQVYsQ0FBa0IsVUFBQ2EsSUFBRCxFQUFVO0FBQ3hCZCx5RkFHd0JZLFdBSHhCLHdEQUkyQkUsS0FBS0MsU0FKaEMscURBS3dCRCxLQUFLZCxNQUw3QjtBQVFBYSxpQ0FDTUQsV0FETjtBQUVILFNBWEQ7QUFZSjdCLGlCQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DeUIsU0FBcEMsR0FBZ0RULE1BQWhEO0FBQ0FqQixpQkFBU0MsY0FBVCxDQUF3QixZQUF4QixFQUFzQ3lCLFNBQXRDLEdBQWtESSxVQUFsRDtBQUNILEtBM0JEO0FBNEJIIiwiZmlsZSI6Imhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5sZXQgcGF5bG9hZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpO1xuZnVuY3Rpb24gdmVyaWZ5VG9rZW4oKXtcbiAgICBpZighdG9rZW4pe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gYWRtaW4gc2hvdWxkIG5vdCBiZSBhYmxlIHRvIGFjZXNzIHVzZXIgcGVyc29uYWwgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICB9XG59XG5cblxubGV0IG9wZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKTtcbmxldCBvcGVuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2MlwiKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBvcGVuLnN0eWxlLndpZHRoID0gXCIyMDBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBvcGVuLnN0eWxlLndpZHRoID0gXCIwXCI7XG4gICAgXG59XG5cbmZ1bmN0aW9uIG9wZW5OYXYyKCkge1xuICAgIG9wZW4yLnN0eWxlLndpZHRoID0gXCIyMDBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdjIoKSB7XG4gICAgb3BlbjIuc3R5bGUud2lkdGggPSBcIjBcIjtcbn1cblxuXG4vLyB1c2VybmFtZVxuLy8gZnVuY3Rpb24gdXNlcm5hbWUoKXtcbi8vICAgICBsZXQgcmVzdWx0ICs9XG4vLyAgICAgYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+JHtwYXlsb2FkLmxhc3ROYW1lfTwvYT48L2xpPmBcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lcmh0bWwgPSByZXN1bHQ7XG4vLyB9XG5cbi8vIHVzZXJuYW1lKCk7XG5cbi8vIGNvbnN1bWUgQVBJIGZvciByZXN1bHRzXG5mdW5jdGlvbiBnZXRPZmZpY2UoKXtcbiAgICAgICAgLy8gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YxL2NhbmRpZGF0ZXNcIiwge1xuICAgICAgICAvLyAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgLy8gICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgIC8vICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgLy8gICAgICAgICAneC1hY2Nlc3MtdG9rZW4nOiB0b2tlblxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAvLyAudGhlbigoZGF0YSk9PntcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAvLyAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAvLyAgICAgZGF0YS5kYXRhLmZvckVhY2goKGNhbmRpZGF0ZSkgPT57XG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0ICs9XG4gICAgICAgIC8vICAgICAgICAgYGBcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KSxcblxuICAgICAgICBmZXRjaChcImh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2VzXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKChvZmZpY2UpID0+e1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJzaG93UmVzdWx0KCcke29mZmljZS5pZH0nLCAnJHtvZmZpY2UubmFtZX0nKVwiPjxzcGFuPiR7b2ZmaWNlLm5hbWV9PC9zcGFuPjwvYT5gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9XG4gICAgICAgICAgICAgICAgYDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCIgc3R5bGU9XCJmb250LXNpemU6MjBweDtcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gXG5cbiAgICAgICAgICAgICAgICBuYW1lc2lkZSA9XG4gICAgICAgICAgICAgICAgYDxzcGFuPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvc3Bhbj5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYyJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICAgICAgfSlcbn1cblxuZ2V0T2ZmaWNlKCk7XG5cbmZ1bmN0aW9uIHNob3dSZXN1bHQob2ZmaWNlSWQsIG9mZmljZVNOYW1lKXtcbiAgICBjb25zb2xlLmxvZyhvZmZpY2VJZCk7XG4gICAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHtvZmZpY2VJZH0vcmVzdWx0YCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBsZXQgbmFtZU9mZmljZSA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHZvdGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLXRoPVwiT2ZmaWNlOlwiPiR7b2ZmaWNlU05hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS10aD1cIkNhbmRpZGF0ZTpcIj4ke3ZvdGUuY2FuZGlkYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtdGg9XCJSZXN1bHQ6XCI+JHt2b3RlLnJlc3VsdH08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIG5hbWVPZmZpY2UgPVxuICAgICAgICAgICAgICAgIGA8Yj4ke29mZmljZVNOYW1lfTwvYj5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlUm93JykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlbmFtZScpLmlubmVySFRNTCA9IG5hbWVPZmZpY2U7XG4gICAgfSkgICAgICAgIFxufVxuIl19