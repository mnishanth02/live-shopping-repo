const express = require('express');
const auth = require('../middleware/auth')
const multer = require('multer')

const router = new express.Router();

const ShopController = require('../controller/shop-controller')



const updaload = new multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('error'))
        }
        cb(undefined, true)
    }
})


router.post('/register', auth, updaload.single('shopImage'), ShopController.register);  // Tested
router.get('/shops', auth, ShopController.shops); // tested

router.get('/:shopId', auth, ShopController.getShopById); // tested
router.put('/edit/:shopId', auth, ShopController.editShop); // tested


router.get('/allProducts/:shopId', auth, ShopController.allProducts); // tested
router.post('/addProduct/:shopId', auth, ShopController.addProduct); //tested
router.put('/product/edit/:shopId/:productId', auth, ShopController.editShopProduct); // 

router.get('/product/:shopId/:productId', auth, ShopController.getProductById); // tested
router.delete('/product/:shopId/:productId', auth, ShopController.deleteProduct); // tested


// router.get('/products', auth, ShopController.products);
// router.get('/product/:id', auth, ShopController.product);


module.exports = router;
