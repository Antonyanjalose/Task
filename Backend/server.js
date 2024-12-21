const express = require('express')
require('dotenv').config();
const cors = require('cors');
const connectdb = require('./config/Db');
const userRoutes = require('./routes/User')

const app = express();

app.use(express.json());
app.use(cors());

connectdb();

app.use('/users',userRoutes)

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=> console.log(`Server Running on Port ${PORT}`))