'use strict';

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

// Add modal
var openModal = document.getElementById("openmodal");
function openAdd() {
    openModal.style.display = "block";
}

function closeAdd() {
    openModal.style.display = "none";
}

// menu
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Consuming the API admin to get all political offices
document.getElementById('addOffice').addEventListener('submit', addOffice);

function addOffice(e) {
    e.preventDefault();

    var type = document.getElementById('type').value;
    var name = document.getElementById('name').value;
    var result = document.getElementById('result');
    var responseStatus = false;

    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            type: type,
            name: name
        })

    }).then(function (res) {
        console.log(res);
        if (res.ok) {
            responseStatus = true;
            result.innerHTML = "Office successfully created";
            result.style.color = "white";
        }
        return res.json();
    })
    //Only admin can access the route
    .then(function (res) {
        console.log(res);
        if (!responseStatus) {
            result.innerHTML = res.error;
            result.style.color = "White";
        }
        if (res.data[0].user.isadmin == true) {
            window.location.href = '/views/signin.html';
        }
    });
}

function getOffice() {
    fetch('https://trustpolitico.herokuapp.com/api/v1/offices', {
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
            result += '<div class="box box2">\n                <p class="type">' + office.type + '</p>\n                <p class="people">' + office.name + '</p>\n        </div> ';

            username = '<li><a href="#" class="active">' + payload.userName + ' ' + payload.lastName + '</a></li>';

            nameside = '<span> ' + payload.userName + ' ' + payload.lastName + '</span>';
        });
        document.getElementById('officeResult').innerHTML = result;
        document.getElementById('username').innerHTML = username;
        document.getElementById('nameside').innerHTML = nameside;
    });
}

getOffice();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvZ292T2ZmaWNlLmpzIl0sIm5hbWVzIjpbInRva2VuIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBheWxvYWQiLCJKU09OIiwicGFyc2UiLCJhdG9iIiwic3BsaXQiLCJ2ZXJpZnlUb2tlbiIsImxvY2F0aW9uIiwiaHJlZiIsImlzQWRtaW4iLCJleHAiLCJpYXQiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm9wZW5Nb2RhbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvcGVuQWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xvc2VBZGQiLCJvcGVuTmF2Iiwid2lkdGgiLCJjbG9zZU5hdiIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRPZmZpY2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0eXBlIiwidmFsdWUiLCJuYW1lIiwicmVzdWx0IiwicmVzcG9uc2VTdGF0dXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5Iiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsIm9rIiwiaW5uZXJIVE1MIiwiY29sb3IiLCJqc29uIiwiZXJyb3IiLCJkYXRhIiwidXNlciIsImlzYWRtaW4iLCJnZXRPZmZpY2UiLCJmb3JFYWNoIiwib2ZmaWNlIiwidXNlcm5hbWUiLCJ1c2VyTmFtZSIsImxhc3ROYW1lIiwibmFtZXNpZGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsQ0FBWjtBQUNBLElBQUlDLFVBQVVDLEtBQUtDLEtBQUwsQ0FBV0wsT0FBT00sSUFBUCxDQUFZUCxNQUFNUSxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFaLENBQVgsQ0FBZDtBQUNBLFNBQVNDLFdBQVQsR0FBc0I7QUFDbEIsUUFBRyxDQUFDVCxLQUFKLEVBQVU7QUFDTkMsZUFBT1MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIscUJB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Q2hCZixVQUFNLG9EQUFOLEVBQTREO0FBQ3hEQyxnQkFBUSxLQURnRDtBQUV4REMsaUJBQVM7QUFDTCxzQkFBVSxtQ0FETDtBQUVMLDRCQUFnQixrQkFGWDtBQUdMLDhCQUFrQnZDO0FBSGI7QUFGK0MsS0FBNUQsRUFRSzBDLElBUkwsQ0FRVSxVQUFDQyxHQUFEO0FBQUEsZUFBU0EsSUFBSUksSUFBSixFQUFUO0FBQUEsS0FSVixFQVNLTCxJQVRMLENBU1UsVUFBQ08sSUFBRCxFQUFVO0FBQ1psQyxnQkFBUUMsR0FBUixDQUFZaUMsSUFBWjtBQUNBLFlBQUlkLFNBQVMsRUFBYjtBQUNBYyxhQUFLQSxJQUFMLENBQVVJLE9BQVYsQ0FBa0IsVUFBQ0MsTUFBRCxFQUFZO0FBQzFCbkIsbUZBRWtCbUIsT0FBT3RCLElBRnpCLGdEQUdvQnNCLE9BQU9wQixJQUgzQjs7QUFNUnFCLDJEQUMwQ25ELFFBQVFvRCxRQURsRCxTQUM4RHBELFFBQVFxRCxRQUR0RTs7QUFHUUMsbUNBQ1V0RCxRQUFRb0QsUUFEbEIsU0FDOEJwRCxRQUFRcUQsUUFEdEM7QUFFSCxTQVpEO0FBYUp0QyxpQkFBU0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q3lCLFNBQXhDLEdBQW9EVixNQUFwRDtBQUNBaEIsaUJBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0N5QixTQUFwQyxHQUFnRFUsUUFBaEQ7QUFDQXBDLGlCQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DeUIsU0FBcEMsR0FBZ0RhLFFBQWhEO0FBQ0gsS0E1QkQ7QUFnQ0g7O0FBRUROIiwiZmlsZSI6Imdvdk9mZmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbmxldCBwYXlsb2FkID0gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0b2tlbi5zcGxpdCgnLicpWzFdKSk7XG5mdW5jdGlvbiB2ZXJpZnlUb2tlbigpe1xuICAgIGlmKCF0b2tlbil7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnO1xuICAgIH1cbiAgICAvLyBvbmx5IGFkbWluIGNhbiBhY2VzcyB0aGlzIHBhZ2VcbiAgICBpZihwYXlsb2FkLmlzQWRtaW4gPT0gZmFsc2Upe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3Mvc2lnbi1pbi5odG1sJztcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdG9rZW4gaGFzIGV4cGlyZWRcbiAgICBpZihwYXlsb2FkLmV4cCA+PSBwYXlsb2FkLmlhdCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gaGFkIGV4cGlyZWQhXCIpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy80MDEuaHRtbCc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduLWluLmh0bWwnOyBcbiAgICAgICAgfSwgMzAwMDApO1xuICAgIH1cbn1cblxuLy8gQWRkIG1vZGFsXG5sZXQgb3Blbk1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVubW9kYWxcIik7XG5mdW5jdGlvbiBvcGVuQWRkKCkge1xuICAgIG9wZW5Nb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5mdW5jdGlvbiBjbG9zZUFkZCgpIHtcbiAgICBvcGVuTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vLyBtZW51XG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTaWRlbmF2XCIpLnN0eWxlLndpZHRoID0gXCIyMDBweFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15U2lkZW5hdlwiKS5zdHlsZS53aWR0aCA9IFwiMFwiO1xufVxuXG5cbi8vIENvbnN1bWluZyB0aGUgQVBJIGFkbWluIHRvIGdldCBhbGwgcG9saXRpY2FsIG9mZmljZXNcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRPZmZpY2UnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGRPZmZpY2UpO1xuXG5mdW5jdGlvbiBhZGRPZmZpY2UoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgXG4gICAgbGV0IHR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHlwZScpLnZhbHVlO1xuICAgIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcbiAgICBsZXQgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuICAgIGxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuXG5cbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL29mZmljZXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ3gtYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdHlwZTogdHlwZSwgXG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJPZmZpY2Ugc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cIndoaXRlXCI7XG4gICAgICAgIH1cbiAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gICAgLy9Pbmx5IGFkbWluIGNhbiBhY2Nlc3MgdGhlIHJvdXRlXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cIldoaXRlXCI7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKHJlcy5kYXRhWzBdLnVzZXIuaXNhZG1pbiA9PSB0cnVlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9zaWduaW4uaHRtbCc7XG4gICAgICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbmZ1bmN0aW9uIGdldE9mZmljZSgpe1xuICAgIGZldGNoKCdodHRwczovL3RydXN0cG9saXRpY28uaGVyb2t1YXBwLmNvbS9hcGkvdjEvb2ZmaWNlcycsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICd4LWFjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICAgIH0sXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goKG9mZmljZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPVxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiYm94IGJveDJcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInR5cGVcIj4ke29mZmljZS50eXBlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZVwiPiR7b2ZmaWNlLm5hbWV9PC9wPlxuICAgICAgICA8L2Rpdj4gYFxuXG4gICAgICAgIHVzZXJuYW1lID1cbiAgICAgICAgICAgICAgICBgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIj4ke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L2E+PC9saT5gXG5cbiAgICAgICAgICAgICAgICBuYW1lc2lkZSA9XG4gICAgICAgICAgICAgICAgYDxzcGFuPiAke3BheWxvYWQudXNlck5hbWV9ICR7cGF5bG9hZC5sYXN0TmFtZX08L3NwYW4+YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmZpY2VSZXN1bHQnKS5pbm5lckhUTUwgPSByZXN1bHQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXNpZGUnKS5pbm5lckhUTUwgPSBuYW1lc2lkZTtcbiAgICB9KVxuICAgIFxuXG4gICAgICAgIFxufVxuXG5nZXRPZmZpY2UoKTtcbiJdfQ==