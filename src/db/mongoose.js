const mongoose = require('mongoose');

mongoose.set("debug", true);

mongoose.connect(process.env.MONGOOSEDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((res) => {
    console.log("Connected Successfully to MongoDb Atlas" );
}).catch((err) => {
    console.log("Connection failed->" + err);
});


