export function validateEmail(mail) {
  const emailRegex = /^([A-Za-z0-9-_.])+@([A-Za-z0-9-_.])+\.([A-Za-z]{2,4})$/;
  if (emailRegex.test(mail)) {
    return true;
  }
  return false;
}

export function validatePhonenumber(num) {
  const phoneNumberRegex = /^\d{8,11}$/;
  if (num !== '' && num !== undefined) {
    if (num.match(phoneNumberRegex)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function validatePassword(pwd) {
  if (pwd !== '' && pwd !== undefined) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return pwd.match(passwordRegex);
  }
  return false;
}

export function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0 || s.trim() === '' ? false : true;
}
