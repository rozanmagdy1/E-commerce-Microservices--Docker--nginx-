const { validationResult } = require('express-validator');
let { CategoryService } = require("../Services/categoryService");
let service = new CategoryService();
class CategoryController {
    async getCategories(req, res) {
        let categories = await service.getCategories();
        if (categories === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ categories });
        }
    }

    async getCategoryById(req, res) {
        let id = req.params.id;
        let category = await service.getCategoryById(id);
        if (category === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (category === 'not found') {
            res.status(404).json({ message: "Category not found!" });
        } else {
            res.status(200).json({ category });
        }
    }

    async getCategoryByName(req, res) {
        let name = req.params.name;
        let category = await service.getCategoryByName(name);
        if (category === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (category === 'not found') {
            res.status(404).json({ message: "Category not found!" });
        } else {
            res.status(200).json({ category });
        }
    }

    async addCategory(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addCategory(data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'already exist'){
                res.status(403).json({ message: "Category already exists, use another name" });
            } else {
                res.status(200).json({ message: "Category added successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async updateCategory(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.updateCategory(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ Message: "Category not found!" });
            } else {
                res.status(200).json({ Message: "Category updated successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async changeCategoryStatus(req, res) {
        let id = req.params.id;
        let result = await service.changeCategoryStatus(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "Category not found!" });
        } else {
            res.status(200).json({ message: 'Category status changed successfully' });
        }
    }

    async addCategoryImage(req,res){
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addCategoryImage(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ message: "Category not found!" });
            } else {
                res.status(200).json({ message: 'Category image added successfully' });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }
}
module.exports = {
    CategoryController
}