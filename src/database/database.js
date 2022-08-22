const mongoose = require('mongoose'); // bring our mongoose's file to my variavel mongoose

const connectToDataBase = () => {
  // console.log("mongodb+srv://root:admin@p4m3.zjrofrc.mongodb.net/?retryWrites=true&w=majority")// this code is now in .env
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected!')) // (.then) it is a promice
    .catch((err) => console.log('Error connecting to database')); // it is a promice
};

module.exports = connectToDataBase;
