const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
// Log HTTP requests
app.use(morgan("dev"));
app.use(cors());

// MongoDB Atlas connection
const mongo_url = `mongodb+srv://Kassiyet:x8mWdUpxZoBOCdta@kassiyet.c2egr.mongodb.net/?retryWrites=true&w=majority&appName=Kassiyet`;
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

app.get("/", (req, res) => {
  res.status(200).json("This is the server side!");
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Routes for user-related operations
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

