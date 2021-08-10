const express = require('express');
const router = express.Router();
let Category = require('../models/category');
let Product = require('../models/product');
let UserInfo = require('../models/UserInfo');

router.route('/').get(async (req,res) => {
    const categoryCount = await Category.count().exec()
    const productCount = await Product.count().exec()
    const userCount = await UserInfo.count().exec()

    res.json({categoryCount, productCount, userCount})

});

module.exports = router;