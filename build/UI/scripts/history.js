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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwib3BlbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuMiIsIm9wZW5OYXYiLCJzdHlsZSIsIndpZHRoIiwiY2xvc2VOYXYiLCJvcGVuTmF2MiIsImNsb3NlTmF2MiIsImdldE9mZmljZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmb3JFYWNoIiwib2ZmaWNlIiwiaWQiLCJuYW1lIiwiaW5uZXJIVE1MIiwidXNlcm5hbWUiLCJuYW1lc2lkZSIsInNob3dSZXN1bHQiLCJvZmZpY2VJZCIsIm9mZmljZVNOYW1lIiwibmFtZU9mZmljZSIsInZvdGUiLCJjYW5kaWRhdGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUtDLEtBQUwsQ0FBV0wsT0FBT00sSUFBUCxDQUFZUCxNQUFNUSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFaLENBQVgsQ0FBZDtBQUNBLFNBQVNDLFdBQVQsR0FBc0I7QUFDbEIsUUFBRyxDQUFDVCxLQUFKLEVBQVU7QUFDTkMsZUFBT1MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIscUJBQXZCO0FBQ0g7QUFDRDtBQUNBLFFBQUdQLFFBQVFRLE9BQVIsSUFBbUIsSUFBdEIsRUFBMkI7QUFDdkJYLGVBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHFCQUF2QjtBQUNIO0FBQ0Q7QUFDSDs7QUFHRCxJ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ZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgaWYoIXRva2VuKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGFkbWluIHNob3VsZCBub3QgYmUgYWJsZSB0byBhY2VzcyB1c2VyIHBlcnNvbmFsIHBhZ2VcbiAgICBpZihwYXlsb2FkLmlzQWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBjaGVjayBpZiB0b2tlbiBoYXMgZXhwaXJlZFxufVxuXG5cbmxldCBvcGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIik7XG5sZXQgb3BlbjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdjJcIik7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgb3Blbi5zdHlsZS53aWR0aCA9IFwiMjAwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgb3Blbi5zdHlsZS53aWR0aCA9IFwiMFwiO1xuICAgIFxufVxuXG5mdW5jdGlvbiBvcGVuTmF2MigpIHtcbiAgICBvcGVuMi5zdHlsZS53aWR0aCA9IFwiMjAwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYyKCkge1xuICAgIG9wZW4yLnN0eWxlLndpZHRoID0gXCIwXCI7XG59XG5cblxuLy8gdXNlcm5hbWVcbi8vIGZ1bmN0aW9uIHVzZXJuYW1lKCl7XG4vLyAgICAgbGV0IHJlc3VsdCArPVxuLy8gICAgIGA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPiR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gXG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJodG1sID0gcmVzdWx0O1xuLy8gfVxuXG4vLyB1c2VybmFtZSgpO1xuXG4vLyBjb25zdW1lIEFQSSBmb3IgcmVzdWx0c1xuZnVuY3Rpb24gZ2V0T2ZmaWNlKCl7XG4gICAgICAgIC8vIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MS9jYW5kaWRhdGVzXCIsIHtcbiAgICAgICAgLy8gICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIC8vICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAvLyAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIC8vICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vIH0pLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLy8gLnRoZW4oKGRhdGEpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgLy8gICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgLy8gICAgIGRhdGEuZGF0YS5mb3JFYWNoKChjYW5kaWRhdGUpID0+e1xuICAgICAgICAvLyAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAvLyAgICAgICAgIGBgXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSksXG5cbiAgICAgICAgZmV0Y2goXCJodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvb2ZmaWNlc1wiLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgob2ZmaWNlKSA9PntcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwic2hvd1Jlc3VsdCgnJHtvZmZpY2UuaWR9JywgJyR7b2ZmaWNlLm5hbWV9JylcIj48c3Bhbj4ke29mZmljZS5uYW1lfTwvc3Bhbj48L2E+YFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteVNpZGVuYXYyJykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlcm5hbWU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICAgICAgfSlcbn1cblxuZ2V0T2ZmaWNlKCk7XG5cbmZ1bmN0aW9uIHNob3dSZXN1bHQob2ZmaWNlSWQsIG9mZmljZVNOYW1lKXtcbiAgICBjb25zb2xlLmxvZyhvZmZpY2VJZCk7XG4gICAgZmV0Y2goYGh0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9vZmZpY2UvJHtvZmZpY2VJZH0vcmVzdWx0YCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBsZXQgbmFtZU9mZmljZSA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKHZvdGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLXRoPVwiT2ZmaWNlOlwiPiR7b2ZmaWNlU05hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS10aD1cIkNhbmRpZGF0ZTpcIj4ke3ZvdGUuY2FuZGlkYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtdGg9XCJSZXN1bHQ6XCI+JHt2b3RlLnJlc3VsdH08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIG5hbWVPZmZpY2UgPVxuICAgICAgICAgICAgICAgIGA8Yj4ke29mZmljZVNOYW1lfTwvYj5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlUm93JykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmaWNlbmFtZScpLmlubmVySFRNTCA9IG5hbWVPZmZpY2U7XG4gICAgfSkgICAgICAgIFxufVxuIl19