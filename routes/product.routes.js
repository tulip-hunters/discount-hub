const express = require("express");
const Product = require("../models/Product.model");
const Shop = require("../models/Shop.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

//READ: list of products
router.get("/products", (req, res, next) => {
  Product.find()
    .populate("shop")
    .then((productsArr) => {
      const data = {
        products: productsArr,
      };
      res.render("products/products-list", data);
    })
    .catch((e) => {
      console.log("Error loading the products page.", e);
      next(e);
    });
});

//CREATE: display form
router.get("/product/create",isLoggedIn , (req, res, next) => {

  Shop.find()
    .then( shopsArr => {

      const data = {
        shops: shopsArr,
      }

      res.render("products/product-create", data);
    })
    .catch((e) => {
      console.log("Error loading created product", e);
      next(e);
    });
});

//create product process form
router.post("/products",isLoggedIn , (req, res, next) => {
  const productDetails = {
    name: req.body.name,
    description: req.body.description,
    fullPrice: req.body.fullPrice,
    discountPrice: req.body.discountPrice,
    expirationDate: req.body.expirationDate,
    tags: req.body.tags,
    shop: req.body.shop,
  };
  Product.create(productDetails)
    .then((productFromDB) => {
      res.redirect("/products");
    })
    .catch((e) => {
      console.log("Error creating new product.", e);
      next(e);
    });
});

////////////////////////////////

//READ: product details
router.get("/products/:productId", (req, res, next) => {

  const { productId } = req.params;

  Product.findById(productId)
    .populate("shop")
    .then( productDetails => {

      console.log(productDetails)

      res.render("products/product-details", productDetails);
    })
    .catch(e => {
      console.log("Error loading the product page.", e);
      next(e);
    });

});



//UPDATE: display form
router.get('/products/:productId/edit',isLoggedIn, (req, res, next) => {
  const { productId } = req.params;

  let productDetails;

  Product.findById(productId)
    .then(productFromDB => {
      productDetails = productFromDB; //update variable in the parent scope
      return Shop.find(); //get list of shops
    })
    .then( shopsArr => {

      const data = { 
        product: productDetails,
        shops: shopsArr
      }

      res.render('products/product-edit.hbs', data);
    } )
    .catch(error => next(error));
});



//UPDATE: process form
router.post('/products/:productId/edit',isLoggedIn, (req, res, next) => {
  const { productId } = req.params;
  const { name, description, fullPrice, discountPrice, expirationDate, tags, shop } = req.body;

  Product.findByIdAndUpdate(productId, { name, description, fullPrice, discountPrice, expirationDate, tags, shop}, { new: true })
    .then(updatedProduct => {
      res.redirect(`/products/${updatedProduct.id}`); //redirect to products details page
    })
    .catch(error => next(error));
});



//DELETE
router.post('/products/:productId/delete',isLoggedIn, (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => res.redirect('/products'))
    .catch(error => next(error));
});


////////////////////////////////////////

module.exports = router;
