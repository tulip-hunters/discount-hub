const mongoose = require('mongoose');
const Shop = require('../models/Shop.model');
const Product = require('../models/Product.model');


const products = [
    {
        name: "Ariel",
        description: "laundry gel",
        fullPrice: 7,
        discountPrice: 5,
        expirationDate: 12-12-2023,
        tags: 'non-food',
        shop: "Dirk",
    }, 
    {
        name: "Broccoli",
        description: "green vegetable",
        fullPrice: 2,
        discountPrice: 1,
        expirationDate: 01-05-2023,
        tags: 'food',
        shop: "Lidl",
    },
    {
        name: "Croissant",
        description: "lekker",
        fullPrice: 4,
        discountPrice: 2,
        expirationDate: 10-04-2023,
        tags: 'food',
        shop: "Aldi",
    },
];

const shops = [
    {
        name: "Aldi",
        image: "public/images/Aldi.png",
        link: "https://www.aldi.nl/"
    },
    {
        name: "Albert Hijn",
        image: "/public/images/Albert_Heijn_Logo.png",
        link: "https://www.ah.nl/",
    },
    {
        name: "Coop",
        image: "Aldi.png",
        link: "https://www.coop.nl/",
    },
    {
        name: "Dirk",
        image: "Aldi.png",
        link: "https://www.dirk.nl/",
    },
    {
        name: "Deka Markt",
        image: "Aldi.png",
        link: "https://www.dekamarkt.nl/",
    },
    {
        name: "Jumbo",
        image: "Aldi.png",
        link: "https://www.jumbo.com/",
    },
    {
        name: "Lidl",
        image: "Aldi.png",
        link: "https://www.lidl.nl/",
    },
    {
        name: "Ekoplaza",
        image: "Aldi.png",
        link: "https://www.ekoplaza.nl/",
    },
    {
        name: "Marqt",
        image: "Aldi.png",
        link: "https://www.marqt.nl/",
    },
    {
        name: "Spar",
        image: "Aldi.png",
        link: "https://www.spar.nl/",
    },
    {
        name: "Vomar",
        image: "Aldi.png",
        link: "https://www.vomar.nl/",
    },
    {
        name: "other",
        image: "Aldi.png",
        link: "https://www.ironhack.com/",
    },
];

async function seedData() {
    try {

        /* CONNECT */
        const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/discount-hub';
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
                name: productObj.name,
                description: productObj.description,
                shop: shopId,
                fullPrice: productObj.fullPrice,
                discountPrice: productObj.discountPrice,
                expirationDate: productObj.expirationDate,
                tags: productObj.tags,
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