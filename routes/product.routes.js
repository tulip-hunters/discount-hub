const express = require('express');
const Product = require('../models/Product.model');
const Shop = require('../models/Shop.model');

const isUserLoggedIn = require("../middleware/isLoggedIn");


const router = express.Router();


//READ: list of products
router.get("/products", (req, res, next) => {
  Product.find()
  .populate("shop")
  .then(productsArr => {

    const data = {
        products: productsArr
    }
    res.render("products/products-list", data)
  })
  .catch(e => {
    console.log("Error loading the products page.", e);
    next(e);
  })
  
})

//CREATE: display form
router.get("/product/create", (req, res, next) => {

    Shop.find()
        .then(shopsArr => {
            const data = {
                shops: shopsArr
            }
        res.render("products/product-create", data);
        })
        .catch(e => {
            console.log("Error loading created product", e);
            next(e);
        })
})

//create product process form
router.post("/products", (req,res,next) => {
     
    const productDetails = {
        name: req.body.name,
        description: req.body.description,
        fullPrice: req.body.fullPrice,
        expirationDate: req.body.expirationDate,
        tags: req.body.tags,
        shop: req.body.shop,
    }
     Product.create(productDetails)
       .then(productFromDB => {
        res.redirect("/products")
       })
       .catch(e => {
        console.log("Error creating new product.", e)
        next(e);
       })

})


module.exports = router;

