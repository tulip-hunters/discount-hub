const { Schema, model } = require("mongoose");

const productSchema = new Schema( 
    {
        name: String,
        description: String,
        fullPrice: Number,
        discountPrice: Number,
        expirationDate: Date,
        tags: {
            type: String,
            enum: ['food', 'non-food' ],
        },
        shop: {
            type: String,
            enum: ['Albert Hijn', 'Aldi', 'Lidl', 'Jumbo', 'Deka Markt', 'Vommar', 'Dirk', 'Coop', 'Ekoplaza', 'Spar', 'Marqt', 'other' ],
        }
    },
    {
        timestamps: true
    },
);

const Product = model ('Product', productSchema);
module.exports = Product;