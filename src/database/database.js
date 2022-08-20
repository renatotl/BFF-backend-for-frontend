const mongoose = require("mongoose");// bring our mongoose's file to my variavel mongoose

const connectToDataBase = () => {
    console.log("")
    mongoose.connect(processs.env.DATABASE_URL,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
    })
.then(() => console.log("MongoDB connected!"))// (.then) it is a promice
.catch(err => console.log("Error connecting to database"))// it is a promice
}


module.exports = connectToDataBase