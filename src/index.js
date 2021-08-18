const express = require('express');
const cors = require('cors');

const PORT = 2626;

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send("hello");
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))