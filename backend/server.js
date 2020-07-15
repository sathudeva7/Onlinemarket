import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import uploadRoute from './routes/uploadRoute.js'
 dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app =express();

app.use(bodyParser.json());
app.use("/api/uploads",uploadRoute)
app.use("/api/users", router)
app.use("/api/products",productRoute)
//app.get("/api/products/:id", (req,res) => {
  //  const productId = req.params.id;
    //const product = res.send(data.products.find(x=>x._id === productId));
   //if(product)
     //   res.send(product);
    //else{
      //  res.status(404).send({msg: "Product Not Found."})
    //}
    //});

//app.get("/api/products", (req,res) => {
  //  res.send(data.products);
//});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});