import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import multer from "multer";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transaksiRoutes from './routes/transaksiRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import buyingRoutes from './routes/buyingRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const database = process.env.MONGO_URI || "mongodb+srv://admin:adam123@cluster0.qbwht0w.mongodb.net/kmascoffee?retryWrites=true&w=majority"
// const database = process.env.MONGO_URI || 'mongodb://localhost:27017/kmascoffee'
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log(`${database} connected..`)
})
// mongoose.connect('mongodb://localhost:27017/kmascoffee', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const storage = multer.diskStorage({
//     destination: function(req,file, cb) {
//         cb(null, './assets/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({ storage: storage })

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("database connected.."));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: ["https://penelitianilmiah-fe.herokuapp.com/", "http://localhost:3000"]}));
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(transaksiRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(buyingRoutes);
app.use(adminRoutes);

// app.listen(5000, ()=> console.log(`Server running on port 5000..`));
app.listen(port, ()=> console.log(`Server running on port ${port}..`));