import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from "./routers/Router.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/api/v1', router)
const db = mongoose.connection;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
db.on('error', console.error.bind(console, 'mongoose connection error'))
db.once('open', function () {
    console.log('Database Connected');

});
app.use("/api", router);
app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT || 4000}`);

})