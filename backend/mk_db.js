const mongoose = require('mongoose');
const dbname = process.env.MONGODB_NAME;
const dbuser = process.env.MONGODB_USER;
const dbpass = process.env.MONGODB_PASS;

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0-wcpwy.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
                    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => {
        console.log('DB connected...');
    })
    .catch( (err) => console.log("Couldn't connect to DB...", err));

module.exports = mongoose;