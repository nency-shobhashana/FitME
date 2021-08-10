const express = require('express');
const router = express.Router();
let Product = require('../models/product');

router.route('/').get((req,res) => {
    const categoryId = req.query.categoryId
    const bmi = req.query.bmi
    const receipeType = req.query.receipeType;
    if(categoryId == undefined || categoryId == null){
        Product.find()
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    }
    else if(bmi == undefined || bmi == null || bmi == 0 || bmi == '0'){
        Product.find({category: categoryId, receipeType: receipeType})
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    }
    else {
        Product.find({category: categoryId, receipeType: receipeType, bmi: bmi})
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    }
});

router.route('/search').get((req,res) => {
    const searchText = req.query.searchText;
    console.log(searchText);
        Product.find({name: searchText})
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    
});

router.route('/:id').get((req,res) => {
    const productId = req.params.id
    Product.findById(productId)
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').put((req,res) => {
    const productId = req.params.id
    const name = req.body.productName;
    const category = req.body.categoryId;
    const receipeType = req.body.receipeType;
    const image = req.body.image;
    const bmi = req.body.bmi;
    const details = req.body.productDescription;
    const ingredients = req.body.productIngredients;

    var updateData = {name, category, receipeType, bmi, details, ingredients}
    console.log(image)
    if(image != null && image != undefined){
        updateData = {...updateData, image}
    }
    Product.findByIdAndUpdate(productId, updateData)
        .then(() => res.json('Product Updated.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) => {
    const productId = req.params.id
    Product.findByIdAndDelete(productId)
        .then(() => res.json('Product Deleted.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.productName;
    const category = req.body.categoryId;
    const receipeType = req.body.receipeType;
    const image = req.body.image;
    const bmi = req.body.bmi;
    const details = req.body.productDescription;
    const ingredients = req.body.productIngredients;
    const newProduct = new Product({name, category,receipeType, image, bmi, details, ingredients});

    newProduct.save()
        .then(() => {
            res.json('Product Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;
