const express = require('express');
const Shop = require('../models/Shop.model');

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

// GET /shops
router.get("/shops", (req, res, next) => {
    Shop.find()
        .then( shopsArr => {

            const data = {
                shops: shopsArr
            }
            res.render("shops/shops-list", data);
        })
        .catch(e => {
            console.log("error loading the shops list page", e);
            next(e);
          });
})

module.exports = router;