const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json("This is the server side!");
});


app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`)
})
