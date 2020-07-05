const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/userModel");
const Shop = require("../models/shopModel");
const ShopProduct = require("../models/shopProductsModel");


exports.register = async (req, res, next) => {
    try {

        const existingShop = await Shop.findOne({ email: req.body.email, owner: req.user._id })

        if (existingShop) {
            return res.status(400).json({ code: 'SHOP_EXIST', msg: 'Shop already exist for this email' })
        }

        const newShop = new Shop({
            ...req.body,
            owner: req.user._id
        });

        await newShop.save();
        res.status(201).send({ newShop });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while registering Shop', error });
        console.log(error);
    }
}


exports.shops = async (req, res, next) => {
    try {

        await req.user.populate({
            'path': 'shops',
        }).execPopulate()
        res.status(200).send(req.user.shops);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while registering Shop', error });
        console.log(error);
    }
}


exports.addProduct = async (req, res, next) => {
    try {
        const newProduct = new ShopProduct({
            ...req.body,
            owner: req.user.id,
            shop: req.params.shopId
        })
        await newProduct.save()

        res.status(200).send({ newProduct });
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while Adding Product', error });
        console.log(error);
    }
}

exports.allProducts = async (req, res, next) => {
    try {
        const existingShop = await Shop.findOne({ _id: req.params.shopId })

        if (!existingShop) {
            return res.status(400).json({ code: 'SHOP_NOT_EXIST', msg: 'Shop does not exist' })

        }

        await existingShop.populate({
            'path': 'shopProducts',
        }).execPopulate()
        res.status(200).send(existingShop.shopProducts);
    } catch (error) {
        res.status(400).send({ code: 'ERROR', message: 'Error occured while fetching Shop Products Product', error });
        console.log(error);
    }
}
