const { Schema, model } = require('mongoose');

const shopSchema = new Schema(
    {
        name: String,
        //image: String,
        
    },
    {
        timestamps: true
    }
);

module.exports = model('Shop', shopSchema);






