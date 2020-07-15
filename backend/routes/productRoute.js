import express from 'express';
import Product from '../models/productModel.js';
import { getToken, isAuth, isAdmin } from '../util.js';
const router = express.Router();

router.get("/", async (req, res) => {
    const products= await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product= await Product.findOne({_id:req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"product not found"})
    }
});

router.post("/", isAuth,isAdmin,async(req,res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,

    });
    const newProduct = await product.save();
    if(newProduct){
        res.status(201).send({message:'New Product Created', data:newProduct});
    }
    return res.status(500).send({message:'Error in creating Products.'})
})

router.put("/:id",isAuth,isAdmin, async(req,res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if(product){
        product.name= req.body.name;
        product.price= req.body.price;
        product.image= req.body.image;
        product.brand= req.body.brand;
        product.category= req.body.category;
        product.countInStock= req.body.countInStock;
        product.description= req.body.description;
       
    }
 
    const updatedProduct = await product.save();
    if(updatedProduct){
        return res.status(200).send({message:'New Product Updated', data:updatedProduct});
    }
    return res.status(500).send({message:'Error in updating Products.'})
})

router.delete("/:id", async(req,res) => {
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({message:"Product Deleted"})
        
    }
    res.send("Error in Deletion");
})

export default router;