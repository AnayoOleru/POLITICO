const validateUserInput = (req, res, next) => {
  const { fullname } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { confirmPassword } = req.body;
  const { phoneNumber } = req.body;
  const error = [];

  const validPhone = /^[+]?(\d{0,3})(\d{11})$/;
  if (!validPhone.test(phoneNumber.trim())) {
    error.push('Phone Number is invalid');
  } else res.locals.phoneNumber = phoneNumber;

  if (password !== confirmPassword) {
    error.push('Passwords do not match.');
  } else res.locals.password = password;

  if (password.length < 8 || password.length > 32) {
    error.push('Password too short or too long. Pls provide pass word between 8 and 32 chars.');
  }
  const validName = /^[a-zA-Z][ \-a-zA-Z]{0,50}$/;
  if (!validName.test(fullname.trim())) {
    error.push('Fullname provided is not valid. Only lowercase/uppercase letters are allowed.');
  } else res.locals.fullname = fullname;

  const validEmail = /^[\w\d.\-_]+@[\w\d.\-_]+\.[\w\d]{1,9}(\.[\w\d]{2,9})?$/;
  if (!validEmail.test(email.trim())) {
    error.push('Email provided is not valid.');
  } else res.locals.email = email;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

export default validateUserInput;
