const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const { id, email, firstName, lastName } = user;
  const token = jwt.sign({ id, email, firstName, lastName }, jwtSecretKey);
  return token;
};

const validateToken = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return 'Successfully Verified';
    } else {
      // Access Denied
      return 'Invalid Token';
    }
  } catch (error) {
    // Access Denied
    console.log(error.message);
  }
};

module.exports = { generateToken, validateToken };
