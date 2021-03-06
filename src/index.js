require('dotenv').config()

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Database = require('./config/Database');

const routes = require('./routers');

mongoose.connect(Database.url,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true}).then(() =>{
    console.log('database connected');
},err => {
    console.log(`cant connect database : ${err}`);
});

const PORT = 2626;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/contents',express.static('public'));

app.get('/', (req, res) => {
    res.json({msg : "hello"});
});

app.use('/api/user', routes.UserRouter);
app.use('/api/event', routes.EventRouter);
app.use('/api/join', routes.JoinRouter);
app.use('/api/reserve', routes.ReserveRouter);
app.use('/api/zone', routes.ZoneRouter);
app.use('/api/payment', routes.PaymentRouter);
app.use('/api/upload', routes.UploadRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));