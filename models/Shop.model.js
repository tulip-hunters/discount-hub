const { Schema, model } = require('mongoose');

const shopSchema = new Schema(
    {
        name: String,
        image: String,
        link: String,
        
    },
    {
        timestamps: true
    }
);

module.exports = model('Shop', shopSchema);






