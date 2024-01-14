require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
    try{
        await connectDB(process.env.BASE_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success!');
        process.exit(0);
    } catch {
        console.log(error);
        process.exit(1);
    }
}

start ();