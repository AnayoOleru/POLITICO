'use strict';

// alert("connected!");
document.getElementById('loginPost').addEventListener('submit', loginPost);

function loginPost(e) {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var result = document.getElementById('result');
    var responseStatus = false;

    fetch('https://trustpolitico.herokuapp.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    // render user dashboard
    .then(function (res) {
        if (res.ok) {
            responseStatus = true;
        }
        return res.json();
    }).then(function (res) {
        console.log(res.data);
        if (!responseStatus) {
            result.innerHTML = res.error;
        }
        if (res.data[0].user.isadmin == true) {
            window.localStorage.setItem('token', res.data[0].token);
            window.location.href = '/views/govOffice.html';
        } else {
            window.localStorage.setItem('token', res.data[0].token);
            window.location.href = '/views/parties.html';
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvc2lnbmluLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwibG9naW5Qb3N0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJ2YWx1ZSIsInBhc3N3b3JkIiwicmVzdWx0IiwicmVzcG9uc2VTdGF0dXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXMiLCJvayIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImlubmVySFRNTCIsImVycm9yIiwidXNlciIsImlzYWRtaW4iLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwidG9rZW4iLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsZ0JBQXJDLENBQXNELFFBQXRELEVBQWdFQyxTQUFoRTs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxDQUFuQixFQUFxQjtBQUNqQkEsTUFBRUMsY0FBRjs7QUFFQSxRQUFJQyxRQUFRTixTQUFTQyxjQUFULENBQXdCLE9BQXhCLEVBQWlDTSxLQUE3QztBQUNBLFFBQUlDLFdBQVdSLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NNLEtBQW5EO0FBQ0EsUUFBSUUsU0FBU1QsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsUUFBSVMsaUJBQWlCLEtBQXJCOztBQUdBQyxVQUFNLHVEQUFOLEVBQStEO0FBQzNEQyxnQkFBUSxNQURtRDtBQUUzREMsaUJBQVM7QUFDTCxzQkFBVSxtQ0FETDtBQUVMLDRCQUFnQjtBQUZYLFNBRmtEO0FBTTNEQyxjQUFNQyxLQUFLQyxTQUFMLENBQWU7QUFDakJWLG1CQUFPQSxLQURVO0FBRWpCRSxzQkFBVUE7QUFGTyxTQUFmOztBQU5xRCxLQUEvRDs7QUFhQTtBQWJBLEtBY0NTLElBZEQsQ0FjTSxVQUFDQyxHQUFELEVBQVM7QUFDWCxZQUFHQSxJQUFJQyxFQUFQLEVBQVU7QUFDTlQsNkJBQWlCLElBQWpCO0FBQ0g7QUFDRixlQUFPUSxJQUFJRSxJQUFKLEVBQVA7QUFDRixLQW5CRCxFQW9CQ0gsSUFwQkQsQ0FvQk0sVUFBQ0MsR0FBRCxFQUFTO0FBQ1hHLGdCQUFRQyxHQUFSLENBQVlKLElBQUlLLElBQWhCO0FBQ0EsWUFBRyxDQUFDYixjQUFKLEVBQW1CO0FBQ2ZELG1CQUFPZSxTQUFQLEdBQW1CTixJQUFJTyxLQUF2QjtBQUNIO0FBQ0QsWUFBR1AsSUFBSUssSUFBSixDQUFTLENBQVQsRUFBWUcsSUFBWixDQUFpQkMsT0FBakIsSUFBNEIsSUFBL0IsRUFBb0M7QUFDcENDLG1CQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixPQUE1QixFQUFxQ1osSUFBSUssSUFBSixDQUFTLENBQVQsRUFBWVEsS0FBakQ7QUFDQUgsbUJBQU9JLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHVCQUF2QjtBQUNDLFNBSEQsTUFHSztBQUNMTCxtQkFBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsRUFBcUNaLElBQUlLLElBQUosQ0FBUyxDQUFULEVBQVlRLEtBQWpEO0FBQ0FILG1CQUFPSSxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDQztBQUNKLEtBaENEO0FBaUNIIiwiZmlsZSI6InNpZ25pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFsZXJ0KFwiY29ubmVjdGVkIVwiKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpblBvc3QnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBsb2dpblBvc3QpO1xuXG5mdW5jdGlvbiBsb2dpblBvc3QoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJykudmFsdWU7XG4gICAgbGV0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykudmFsdWU7XG4gICAgbGV0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgICBsZXQgcmVzcG9uc2VTdGF0dXMgPSBmYWxzZTtcblxuXG4gICAgZmV0Y2goJ2h0dHBzOi8vdHJ1c3Rwb2xpdGljby5oZXJva3VhcHAuY29tL2FwaS92MS9hdXRoL2xvZ2luJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsIFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH0pXG4gICAgXG4gICAgLy8gcmVuZGVyIHVzZXIgZGFzaGJvYXJkXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMub2spe1xuICAgICAgICAgICAgcmVzcG9uc2VTdGF0dXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZihyZXMuZGF0YVswXS51c2VyLmlzYWRtaW4gPT0gdHJ1ZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCByZXMuZGF0YVswXS50b2tlbik7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy92aWV3cy9nb3ZPZmZpY2UuaHRtbCc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgcmVzLmRhdGFbMF0udG9rZW4pO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvcGFydGllcy5odG1sJztcbiAgICAgICAgfVxuICAgIH0pXG59Il19