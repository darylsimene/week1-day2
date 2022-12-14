const Category = require('../models/Category');


const getCategories = async (req, res, next) => {
    if (Object.keys(req.query).length) {
        const category = req.query.categoryName
        console.log(`Searching for category: ${category}`);
    }
    try {
        const result = await Category.find(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error retrieving categories: ${err.message}`); 
    }
}; 

const postCategory = async (req, res, next) => {
    try {
        const result = await Category.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'applicaton/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error posting a new category: ${err.message}`)
    }
};

const deleteCategories = async (req, res, next) => {
    try {
        await Category.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'applicaton/json')
        .json({ success: true, msg: 'succesfully deleted all categories!' })
    } catch (err) {
        throw new Error(`Error deleting all categories: ${err.message}`)
    }
}; 

const getCategory = async (req, res, next) => {
    try {
        //payload
        const result = await Category.findById(req.params.categoryId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error getting category id of ${req.params.categoryId}: ${err.message}`)
    }
    
}

const updateCategory = async (req, res, next) => {
    try {
        const result = await Category.findByIdAndUpdate(req.params.categoryId, {
            $set: req.body
        }, {new: true }); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error updating category with id of ${req.params.categoryId}: ${err.message}`)
    }
}; 

const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `Category with id ${req.params.categoryId} has been deleted!` })
    } catch (err) {
        throw new Error(`Erorr deleting category with id of ${req.params.categoryId}: ${err.message}`)
    }
}; 

module.exports = {
    getCategories, 
    postCategory, 
    deleteCategory, 
    getCategory, 
    updateCategory, 
    deleteCategories
}; 