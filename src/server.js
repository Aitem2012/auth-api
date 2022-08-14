require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 3000;
const userRoutes = require('./router');
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
