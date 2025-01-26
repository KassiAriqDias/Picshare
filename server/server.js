const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = 3001;


app.use(express.json());

// MongoDB Atlas connection
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongo_url = `mongodb+srv://Kassiyet:${MONGO_PASSWORD}@kassiyet.c2egr.mongodb.net/?retryWrites=true&w=majority&appName=Kassiyet`
mongoose.connect(mongo_url)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB: ', err));



app.get('/', (req, res) => {
    res.status(200).json("This is the server side!");
});


app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`)
})
