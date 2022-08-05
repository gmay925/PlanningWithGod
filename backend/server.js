require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
// const journalRoutes = require('./routes/journals');

// express app
const app = express();

// mddleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
}); 

// routes
app.use('/api/user', userRoutes)
// app.use('/api/journals', journalRoutes)
app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })
})
.catch((error) => {
  console.log(error)
});


// listen for request


// react to request
app.get('/', (req, res) => {
  res.json({message: 'Welcome to life with God!'});
});



