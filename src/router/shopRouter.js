const express = require('express');
const auth = require('../middleware/auth')

const router = new express.Router();

const ShopController = require('../controller/shop-controller')



//login
router.post('/register', auth, ShopController.register);
router.get('/shops', auth, ShopController.shops);


router.get('/allProducts/:shopId', auth, ShopController.allProducts);
router.post('/addProduct/:shopId', auth, ShopController.addProduct);
// router.get('/products', auth, ShopController.products);
// router.get('/product/:id', auth, ShopController.product);


module.exports = router;
