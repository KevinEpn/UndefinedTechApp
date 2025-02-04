const mongoose = require('mongoose');

const connectDB = async () => {
    // try {
    //     await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
    //     console.log('MongoDB Connected...');
    // } catch (error) {
    //     console.error(error.message);
    //     process.exit(1);
    // }
    //Acá conectaremos la base de datos:
    mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
    const db = mongoose.connection;
};

module.exports = connectDB;