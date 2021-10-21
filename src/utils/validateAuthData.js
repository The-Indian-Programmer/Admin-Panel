const validateData = (data) => {
  const { email, name, age, gender, role, password, cpassword } = data;

  if (!email || !name || !age || !gender || !role || !password || !cpassword) {
    return "All Fields are required";
  }
  const isValidEmail = valiDateEmail(email);
  if (isValidEmail) {
    return isValidEmail;
  }
  const isValidPassword = valiDatePassword(password, cpassword);
  if (isValidPassword) return isValidPassword;
};

const valiDateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    return "Please Enter Email.";
  }

  if (!re.test(String(email).toLowerCase())) {
    return "Please Enter Valid Email.";
  }
};

module.exports = validateData;

const valiDatePassword = (password, cpassword) => {
  if (password.length < 2) {
    return "Password Shoult be at least 6 Characters";
  }
  if (password !== cpassword) {
    return "Password do not Match.";
  }
};
