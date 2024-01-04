const { validationResult } = require('express-validator');
let { SubCategoryService } = require("../Services/subcategoryService");
let service = new SubCategoryService();
class SubCategoryController {
    async getSubCategories(req, res) {
        let subcategories = await service.getSubCategories();
        if (subcategories === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ subcategories });
        }
    }

    async getSubCategoryById(req, res) {
        let id = req.params.id;
        let subcategory = await service.getSubCategoryById(id);
        if (subcategory === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (subcategory === 'not found') {
            res.status(404).json({ message: "Subcategory not found!" });
        } else {
            res.status(200).json({ subcategory });
        }
    }

    async getSubCategoriesByCategoryID(req, res) {
        let id = req.params.id;
        let subcategories = await service.getSubCategoriesByCategoryID(id);
        if (subcategories === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (subcategories === 'not found') {
            res.status(404).json({ message: "No subcategory found!" });
        } else {
            res.status(200).json({ subcategories });
        }
    }

    async getSubCategoriesByCategoryName(req, res) {
        let name = req.params.name;
        let subcategories = await service.getSubCategoriesByCategoryName(name);
        if (subcategories === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (subcategories === 'category not found') {
            res.status(404).json({ message: "Category not found!" });
        } else if (subcategories === 'subcategory not found') {
            res.status(404).json({ message: "No subcategory found!" });
        } else {
            res.status(200).json({ subcategories });
        }
    }

    async getSubCategoryByName(req, res) {
        let name = req.params.name;
        let subcategories = await service.getSubCategoryByName(name);
        if (subcategories === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (subcategories === 'not found') {
            res.status(404).json({ message: "No subcategory found!" });
        } else {
            res.status(200).json({ subcategories });
        }
    }

    async addSubCategory(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addSubCategory(data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'category not found') {
                res.status(404).json({ Message: "Category not found!" });
            } else if (result === 'already exist') {
                res.status(403).json({ message: "Sub_category already exists, use another name" });
            } else {
                res.status(200).json({ message: "Subcategory added successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async updateSubCategory(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.updateSubCategory(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ Message: "Subategory not found!" });
            } else {
                res.status(200).json({ Message: "Subategory updated successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async changeSubCategoryStatus(req, res) {
        let id = req.params.id;
        let result = await service.changeSubCategoryStatus(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "Subcategory not found!" });
        } else {
            res.status(200).json({ message: 'Subcategory status changed successfully' });
        }
    }

    async addSubCategoryImage(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addSubCategoryImage(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ message: "Subcategory not found!" });
            } else {
                res.status(200).json({ message: 'Subcategory image added successfully' });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

}
module.exports = {
    SubCategoryController
}