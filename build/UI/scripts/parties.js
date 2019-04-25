'use strict';

var token = window.localStorage.getItem('token');
var payload = JSON.parse(window.atob(token.split('.')[1]));
function verifyToken() {
    if (!token) {
        window.location.href = '/views/sign-in.html';
    }
    // admin shouldn't be able to acess this page
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

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Consuming the API for parties, users should be able to get all parties

function UserGetParties() {
    fetch('https://trustpolitico.herokuapp.com/api/v1/parties', {
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
            result += '<div class="col-1-of-3">\n                <div class="card">\n                    <div class="card__side card__side--front">\n                        <div class="card__picture card__picture--1" id="partyImage">&nbsp;</div>\n                        <div class="card__details">\n                            <ul>\n                                <li style="font-size: 30px" id="partyName">' + party.name + '</li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div> ';

            username = '<li><a href="#" class="active">' + payload.userName + ' ' + payload.lastName + '</a></li>';

            nameside = '<span>' + payload.userName + ' ' + payload.lastName + '</span>';
        });
        document.getElementById('partyResult').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    });
}

UserGetParties();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvcGFydGllcy5qcyJdLCJuYW1lcyI6WyJ0b2tlbiIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwidmVyaWZ5VG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiLCJpc0FkbWluIiwiZXhwIiwiaWF0IiwiY29uc29sZSIsImxvZyIsInNldFRpbWVvdXQiLCJvcGVuTmF2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwid2lkdGgiLCJjbG9zZU5hdiIsIlVzZXJHZXRQYXJ0aWVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVzdWx0IiwiZm9yRWFjaCIsInBhcnR5IiwibmFtZSIsInVzZXJuYW1lIiwidXNlck5hbWUiLCJsYXN0TmFtZSIsIm5hbWVzaWRlIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLENBQVo7QUFDQSxJQUFJQyxVQUFVQyxLQUFLQyxLQUFMLENBQVdMLE9BQU9NLElBQVAsQ0FBWVAsTUFBTVEsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBWixDQUFYLENBQWQ7QUFDQSxTQUFTQyxXQUFULEdBQXNCO0FBQ2xCLFFBQUcsQ0FBQ1QsS0FBSixFQUFVO0FBQ05DLGVBQU9TLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHFCQUF2QjtBQUNIO0FBQ0Q7QUFDQSxRQUFHUCxRQUFRUSxPQUFSLElBQW1CLElBQXRCLEVBQTJCO0FBQ3ZCWCxlQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDSDtBQUNEO0FBQ0EsUUFBR1AsUUFBUVMsR0FBUixJQUFlVCxRQUFRVSxHQUExQixFQUE4QjtBQUMxQkMsZ0JBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBZixlQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixpQkFBdkI7QUFDQU0sbUJBQVcsWUFBVTtBQUNqQmhCLG1CQUFPUyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDSCxTQUZELEVBRUcsS0FGSDtBQUdIO0FBRUo7O0FBRUQsU0FBU08sT0FBVCxHQUFtQjtBQUNmQyxhQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxLQUFyQyxDQUEyQ0MsS0FBM0MsR0FBbUQsT0FBbkQ7QUFDSDs7QUFFRCxTQUFTQyxRQUFULEdBQW9CO0FBQ2hCSixhQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxLQUFyQyxDQUEyQ0MsS0FBM0MsR0FBbUQsR0FBbkQ7QUFDSDs7QUFHRDs7QUFFQSxTQUFTRSxjQUFULEdBQXlCO0FBQ3JCQyxVQUFNLG9EQUFOLEVBQTREO0FBQ3hEQyxnQkFBUSxLQURnRDtBQUV4REMsaUJBQVM7QUFDTCxzQkFBVSxtQ0FETDtBQUVMLDRCQUFnQixrQkFGWDtBQUdMLDhCQUFrQjNCO0FBSGI7QUFGK0MsS0FBNUQsRUFRSzRCLElBUkwsQ0FRVSxVQUFDQyxHQUFEO0FBQUEsZUFBU0EsSUFBSUMsSUFBSixFQUFUO0FBQUEsS0FSVixFQVNLRixJQVRMLENBU1UsVUFBQ0csSUFBRCxFQUFVO0FBQ1poQixnQkFBUUMsR0FBUixDQUFZZSxJQUFaO0FBQ0EsWUFBSUMsU0FBUyxFQUFiO0FBQ0FELGFBQUtBLElBQUwsQ0FBVUUsT0FBVixDQUFrQixVQUFDQyxLQUFELEVBQVc7QUFDekJGLDZaQU82REUsTUFBTUMsSUFQbkU7O0FBY0pDLDJEQUNzQ2hDLFFBQVFpQyxRQUQ5QyxTQUMwRGpDLFFBQVFrQyxRQURsRTs7QUFHSUMsa0NBQ1NuQyxRQUFRaUMsUUFEakIsU0FDNkJqQyxRQUFRa0MsUUFEckM7QUFFSCxTQXBCRDtBQXFCSm5CLGlCQUFTQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDb0IsU0FBdkMsR0FBbURSLE1BQW5EO0FBQ0FiLGlCQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9Db0IsU0FBcEMsR0FBZ0RKLFFBQWhEO0FBQ0FqQixpQkFBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ29CLFNBQXBDLEdBQWdERCxRQUFoRDtBQUNILEtBcENEO0FBd0NIOztBQUVEZiIsImZpbGUiOiJwYXJ0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xubGV0IHBheWxvYWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuLnNwbGl0KCcuJylbMV0pKTtcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKCl7XG4gICAgaWYoIXRva2VuKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGFkbWluIHNob3VsZG4ndCBiZSBhYmxlIHRvIGFjZXNzIHRoaXMgcGFnZVxuICAgIGlmKHBheWxvYWQuaXNBZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3ZpZXdzL3NpZ24taW4uaHRtbCc7XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRva2VuIGhhcyBleHBpcmVkXG4gICAgaWYocGF5bG9hZC5leHAgPj0gcGF5bG9hZC5pYXQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRva2VuIGhhZCBleHBpcmVkIVwiKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvNDAxLmh0bWwnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJzsgXG4gICAgICAgIH0sIDMwMDAwKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVNpZGVuYXZcIikuc3R5bGUud2lkdGggPSBcIjBcIjtcbn1cblxuXG4vLyBDb25zdW1pbmcgdGhlIEFQSSBmb3IgcGFydGllcywgdXNlcnMgc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGFsbCBwYXJ0aWVzXG5cbmZ1bmN0aW9uIFVzZXJHZXRQYXJ0aWVzKCl7XG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9wYXJ0aWVzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaCgocGFydHkpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz1cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImNvbC0xLW9mLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9fc2lkZSBjYXJkX19zaWRlLS1mcm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX3BpY3R1cmUgY2FyZF9fcGljdHVyZS0tMVwiIGlkPVwicGFydHlJbWFnZVwiPiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfX2RldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT1cImZvbnQtc2l6ZTogMzBweFwiIGlkPVwicGFydHlOYW1lXCI+JHtwYXJ0eS5uYW1lfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiBgXG5cbiAgICAgICAgICAgIHVzZXJuYW1lID1cbiAgICAgICAgICAgICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gXG5cbiAgICAgICAgICAgICAgICBuYW1lc2lkZSA9XG4gICAgICAgICAgICAgICAgYDxzcGFuPiR7cGF5bG9hZC51c2VyTmFtZX0gJHtwYXlsb2FkLmxhc3ROYW1lfTwvc3Bhbj5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcnR5UmVzdWx0JykuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzaWRlJykuaW5uZXJIVE1MID0gbmFtZXNpZGU7XG4gICAgfSlcbiAgICBcblxuICAgICAgICBcbn1cblxuVXNlckdldFBhcnRpZXMoKTtcbiJdfQ==