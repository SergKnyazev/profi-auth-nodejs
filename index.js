const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const URI = 'mongodb+srv://qwerty:qwerty123@cluster1.kgwlq.mongodb.net/auth_roles?retryWrites=true&w=majority';
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const app = express();

app.use(express.json());

const startServer = () => {
  app.listen(() => {
    console.log(`Server has been started on PORT=${PORT}...`)
  })
}

const connectAndStart = (err_bd) => {
    if (err_bd) {
      console.log(`***BD*** : ${err_bd}`);
      return
    }
    startServer()
}

const startApp = async () => {
  try {
    const connect = await mongoose.connect(URI, MONGO_OPTIONS, connectAndStart);
    // console.log(connect);
  } catch (error) {
    console.log(`***SERVER*** : ${error}`)
  }
}

startApp();

// console.log(connect);
//
  // name: 'auth_roles',
  // host: 'cluster1-shard-00-01.kgwlq.mongodb.net',
  // port: 27017,
  // user: 'qwerty',
  // pass: 'qwerty123',


// mongoose.connect("mongodb://localhost:27017/usersdb",
// { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
// function(err){
//   if(err) return console.log(err);
//   app.listen(3000, function(){
//     console.log("Сервер ожидает подключения...");
//   });
// });