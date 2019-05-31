
// alert("connected!");
document.getElementById('addpost').addEventListener('submit', addPost);

function addPost(e) {
  e.preventDefault();


  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const othername = document.getElementById('othername').value;
  const email = document.getElementById('email').value;
  const phonenumber = document.getElementById('phone').value;
  const passportUrl = document.getElementById('file').value;
  const password = document.getElementById('password').value;
  const result = document.getElementById('result');
  let responseStatus = false;
  console.log('hhhhhh');


  fetch('https://trustpolitico.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      passportUrl,
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      password,
    }),

  })
    .then((res) => {
      if (res.ok) {
        responseStatus = true;
        result.innerHTML = 'Signup successful!';
        result.style.color = 'green';
      }
      return res.json();
    })
    .then((res) => {
      console.log(res.user);
      if (!responseStatus) {
        result.innerHTML = res.error;
        result.style.color = 'red';
      }else {
        window.localStorage.setItem('token', res.data[0].token);
        window.location.href = '/views/parties.html';
        console.log(res);
      }
    });
}
