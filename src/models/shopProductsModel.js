const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true,
    },
    productKeyword: {
        type: Array,
        required: true,
        trim: true,
    },
    itemAvailable: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,

})
const ShopProduct = mongoose.model('ShopProduct', productSchema);

module.exports = ShopProduct;