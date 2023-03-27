const mongoose = require('mongoose');
const Shop = require('../models/Shop.model');
const Product = require('../models/Product.model');

const products = [
    {
        name: "Ariel",
        description: "laundry gel",
        fullPrice: 7.8,
        discountPrice: 5.9,
        expirationDate: 12-12-2023,
        tags: {enum: 'non-food'},
        shop: "Dirk",
    }, 
    {
        name: "Broccoli",
        description: "green vegetable",
        fullPrice: 2.8,
        discountPrice: 1.9,
        expirationDate: 01-05-2023,
        tags: {enum: 'food'},
        shop: "Lidl",
    },
    {
        name: "Croissant",
        description: "lekker",
        fullPrice: 1.0,
        discountPrice: 0.75,
        expirationDate: 10-04-2023,
        tags: {enum: 'food'},
        shop: "Aldi",
    },
];

const shops = [
    {
        name: "Aldi"
    },
    {
        name: "Albert Hijn"
    },
    {
        name: "Coop"
    },
    {
        name: "Dirk"
    },
    {
        name: "Deka Markt"
    },
    {
        name: "Jumbo"
    },
    {
        name: "Lidl"
    },
    {
        name: "Ekoplaza"
    },
    {
        name: "Marqt"
    },
    {
        name: "Spar"
    },
    {
        name: "Vomaar"
    },
    {
        name: "other"
    },
];

async function seedData() {
    try {

        /* CONNECT */
        const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/discount-hub';
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to Mongo! Database name: "${conn.connections[0].name}"`);


        /* DELETE EXISTING DATA */
        // const deletedProducts = await Product.deleteMany({}); //WARNING: this will delete all products in your DB !!
        // const deletedShops = await Shop.deleteMany({}); //WARNING: this will delete all shopss in your DB !!
        // console.log(deletedProducts, deletedShops);


        /* Seed shops */
        const shopsCreated = await Shop.insertMany(shops);
        console.log(`Number of shops created... ${shopsCreated.length} `);


        /* Seed products */
        /* (for each product, we need to find the objectId of its shop) */

        const productsWithIds = []; //will be an array of objects (each object contains the details of a book, including the author id)

        for(const productObj of products){
            const shopName = productObj.shop;
            const shopDetails = await Shop.findOne({name: shopName});
            const shopId = shopDetails._id;

            const newProduct = {
                title: productObj.title,
                description: productObj.description,
                rating: productObj.rating,
                shop: shopId
            }

            productsWithIds.push(newProduct);
        }


        const productsCreated = await Product.insertMany(productsWithIds);
        console.log(`Number of products created... ${productsCreated.length} `);


        /* CLOSE DB CONNECTION */
        mongoose.connection.close();

    } catch (e) {
        console.log("error seeding data in DB....", e)
    }
}

seedData();