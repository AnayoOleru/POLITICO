'use strict';

// alert("connected!");
document.getElementById('addpost').addEventListener('submit', addPost);

function addPost(e) {
    e.preventDefault();

    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var othername = document.getElementById('othername').value;
    var email = document.getElementById('email').value;
    var phonenumber = document.getElementById('phone').value;
    var passportUrl = document.getElementById('file').value;
    var password = document.getElementById('password').value;
    var result = document.getElementById('result');
    var responseStatus = false;
    console.log('hhhhhh');

    fetch('https://trustpolitico.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            passportUrl: passportUrl,
            firstname: firstname,
            lastname: lastname,
            othername: othername,
            email: email,
            phonenumber: phonenumber,
            password: password
        })

    }).then(function (res) {
        if (res.ok) {
            responseStatus = true;
            result.innerHTML = "Signup successful!";
            result.style.color = "green";
        }
        return res.json();
    }).then(function (res) {
        console.log(res.user);
        if (!responseStatus) {
            result.innerHTML = res.error;
            result.style.color = "red";
        } else {

            window.localStorage.setItem('token', res.data[0].token);
            window.location.href = '/views/parties.html';
            console.log(res);
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VJL3NjcmlwdHMvc2lnbnVwLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkUG9zdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZpcnN0bmFtZSIsInZhbHVlIiwibGFzdG5hbWUiLCJvdGhlcm5hbWUiLCJlbWFpbCIsInBob25lbnVtYmVyIiwicGFzc3BvcnRVcmwiLCJwYXNzd29yZCIsInJlc3VsdCIsInJlc3BvbnNlU3RhdHVzIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsIm9rIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJjb2xvciIsImpzb24iLCJ1c2VyIiwiZXJyb3IiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZGF0YSIsInRva2VuIiwibG9jYXRpb24iLCJocmVmIl0sIm1hcHBpbmdzIjoiOztBQUNBO0FBQ0FBLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLGdCQUFuQyxDQUFvRCxRQUFwRCxFQUE4REMsT0FBOUQ7O0FBRUEsU0FBU0EsT0FBVCxDQUFpQkMsQ0FBakIsRUFBbUI7QUFDZkEsTUFBRUMsY0FBRjs7QUFHQSxRQUFJQyxZQUFZTixTQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDTSxLQUFyRDtBQUNBLFFBQUlDLFdBQVdSLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NNLEtBQW5EO0FBQ0EsUUFBSUUsWUFBWVQsU0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ00sS0FBckQ7QUFDQSxRQUFJRyxRQUFRVixTQUFTQyxjQUFULENBQXdCLE9BQXhCLEVBQWlDTSxLQUE3QztBQUNBLFFBQUlJLGNBQWNYLFNBQVNDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNNLEtBQW5EO0FBQ0EsUUFBSUssY0FBY1osU0FBU0MsY0FBVCxDQUF3QixNQUF4QixFQUFnQ00sS0FBbEQ7QUFDQSxRQUFJTSxXQUFXYixTQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DTSxLQUFuRDtBQUNBLFFBQUlPLFNBQVNkLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLFFBQUljLGlCQUFpQixLQUFyQjtBQUNBQyxZQUFRQyxHQUFSLENBQVksUUFBWjs7QUFHQUMsVUFBTSx3REFBTixFQUFnRTtBQUM1REMsZ0JBQVEsTUFEb0Q7QUFFNURDLGlCQUFTO0FBQ0wsc0JBQVUsbUNBREw7QUFFTCw0QkFBZ0I7QUFGWCxTQUZtRDtBQU01REMsY0FBTUMsS0FBS0MsU0FBTCxDQUFlO0FBQ2pCWCx5QkFBYUEsV0FESTtBQUVqQk4sdUJBQVdBLFNBRk07QUFHakJFLHNCQUFVQSxRQUhPO0FBSWpCQyx1QkFBV0EsU0FKTTtBQUtqQkMsbUJBQU9BLEtBTFU7QUFNakJDLHlCQUFhQSxXQU5JO0FBT2pCRSxzQkFBVUE7QUFQTyxTQUFmOztBQU5zRCxLQUFoRSxFQWlCQ1csSUFqQkQsQ0FpQk0sVUFBQ0MsR0FBRCxFQUFTO0FBQ1gsWUFBR0EsSUFBSUMsRUFBUCxFQUFVO0FBQ05YLDZCQUFpQixJQUFqQjtBQUNBRCxtQkFBT2EsU0FBUCxHQUFtQixvQkFBbkI7QUFDQWIsbUJBQU9jLEtBQVAsQ0FBYUMsS0FBYixHQUFtQixPQUFuQjtBQUNIO0FBQ0YsZUFBT0osSUFBSUssSUFBSixFQUFQO0FBQ0YsS0F4QkQsRUF5QkNOLElBekJELENBeUJNLFVBQUNDLEdBQUQsRUFBUztBQUNYVCxnQkFBUUMsR0FBUixDQUFZUSxJQUFJTSxJQUFoQjtBQUNBLFlBQUcsQ0FBQ2hCLGNBQUosRUFBbUI7QUFDZkQsbUJBQU9hLFNBQVAsR0FBbUJGLElBQUlPLEtBQXZCO0FBQ0FsQixtQkFBT2MsS0FBUCxDQUFhQyxLQUFiLEdBQW1CLEtBQW5CO0FBQ0gsU0FIRCxNQUdLOztBQUVMSSxtQkFBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsT0FBNUIsRUFBcUNWLElBQUlXLElBQUosQ0FBUyxDQUFULEVBQVlDLEtBQWpEO0FBQ0FKLG1CQUFPSyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixxQkFBdkI7QUFDQXZCLG9CQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQztBQUNKLEtBcENEO0FBcUNIIiwiZmlsZSI6InNpZ251cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gYWxlcnQoXCJjb25uZWN0ZWQhXCIpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZHBvc3QnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGRQb3N0KTtcblxuZnVuY3Rpb24gYWRkUG9zdChlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBcbiAgICBsZXQgZmlyc3RuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0bmFtZScpLnZhbHVlO1xuICAgIGxldCBsYXN0bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYXN0bmFtZScpLnZhbHVlO1xuICAgIGxldCBvdGhlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXJuYW1lJykudmFsdWU7XG4gICAgbGV0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJykudmFsdWU7XG4gICAgbGV0IHBob25lbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob25lJykudmFsdWU7XG4gICAgbGV0IHBhc3Nwb3J0VXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGUnKS52YWx1ZTtcbiAgICBsZXQgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZTtcbiAgICBsZXQgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xuICAgIGxldCByZXNwb25zZVN0YXR1cyA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKCdoaGhoaGgnKVxuXG5cbiAgICBmZXRjaCgnaHR0cHM6Ly90cnVzdHBvbGl0aWNvLmhlcm9rdWFwcC5jb20vYXBpL3YxL2F1dGgvc2lnbnVwJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBwYXNzcG9ydFVybDogcGFzc3BvcnRVcmwsIFxuICAgICAgICAgICAgZmlyc3RuYW1lOiBmaXJzdG5hbWUsIFxuICAgICAgICAgICAgbGFzdG5hbWU6IGxhc3RuYW1lLFxuICAgICAgICAgICAgb3RoZXJuYW1lOiBvdGhlcm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwaG9uZW51bWJlcjogcGhvbmVudW1iZXIsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5vayl7XG4gICAgICAgICAgICByZXNwb25zZVN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJTaWdudXAgc3VjY2Vzc2Z1bCFcIlxuICAgICAgICAgICAgcmVzdWx0LnN0eWxlLmNvbG9yPVwiZ3JlZW5cIlxuICAgICAgICB9XG4gICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLnVzZXIpO1xuICAgICAgICBpZighcmVzcG9uc2VTdGF0dXMpe1xuICAgICAgICAgICAgcmVzdWx0LmlubmVySFRNTCA9IHJlcy5lcnJvcjtcbiAgICAgICAgICAgIHJlc3VsdC5zdHlsZS5jb2xvcj1cInJlZFwiO1xuICAgICAgICB9ZWxzZXtcblxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgcmVzLmRhdGFbMF0udG9rZW4pO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdmlld3MvcGFydGllcy5odG1sJztcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgfVxuICAgIH0pXG59Il19