const mongoose = require('mongoose')


const dbConnect = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });
        console.log('Database Online');
    } catch (error) {
        throw new Error('Database startup error', error)
    }
}

module.exports = {
    dbConnect
}