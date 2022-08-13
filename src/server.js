require('dotenv').config();
const { application } = require('express');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');

const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 3000;
const userRoutes = require('./router');
app.use(express.json());

app.use('/api/users', userRoutes);
app.post('/user/generateToken', (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
