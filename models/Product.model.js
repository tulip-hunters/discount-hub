const { Schema, model } = require("mongoose");



const productSchema = new Schema( 
    {   imageUrl: String ,
        name: {
            type: String,
            required: true,
        },
        description: String,
        fullPrice: Number,
        discountPrice: Number,
        expirationDate: {
            type: Date,
            get: expirationDate => expirationDate.toDateString()
        },
        tags: {
            type: String,
            enum: ['food', 'non-food' ],
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    },
    {
        timestamps: true
    },
);

const Product = model ('Product', productSchema);
module.exports = Product;