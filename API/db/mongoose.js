const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TaskManager')
    .then(() => {
        console.log("Connected to MongoDB successfully :)");
    })
    .catch((e) => {
        console.log("Error while attempting to connect to MongoDB");
        console.log(e);
    });

module.exports = {
    mongoose
};