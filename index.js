const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');

const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const transaksiRoutes = require('./routes/transaksiRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const registerRoutes = require('./routes/registerRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const database = process.env.MONGO_URI || "mongodb+srv://admin:adam123@cluster0.qbwht0w.mongodb.net/kmascoffee?retryWrites=true&w=majority"
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log(database + 'connected..')
})
// mongoose.connect('mongodb://localhost:27017/kmascoffee', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("database connected.."));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/product', productRoutes);
app.use('/product/:id', productRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/transaksi/:id', transaksiRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/token', loginRoutes);
app.use('/logout', loginRoutes)
app.use('/loginadmin', adminRoutes);
app.use('/tokenadmin', adminRoutes);
app.use('/logoutadmin', adminRoutes);
app.use('/regist', adminRoutes);
app.use('/data', adminRoutes);
app.use('/:id', adminRoutes);
// app.use(buyingRoutes);
// app.use(adminRoutes);

app.set('port', process.env.PORT || 5000)

// app.listen(5000, ()=> console.log(`Server running on port 5000..`));
app.listen(process.env.PORT || 5000, ()=> console.log('Server running on port' + port + '...'));