const { validationResult } = require('express-validator');
let { ProductService } = require("../Services/productService");
let service = new ProductService();

class ProductController {
    async getAllProducts(req, res) {
        let products = await service.getAllProducts();
        if (products === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(products);
        }
    }

    async getProductById(req, res) {
        let id = req.params.id;
        let product = await service.getProductById(id);
        if (product === 'not found') {
            res.status(404).json({ message: `No product found!` });
        } else if (product === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }

    async getProductsByCategoryID(req, res) {
        let categoryID = req.params.categoryID;
        let product = await service.getProductsByCategoryID(categoryID);
        if (product === 'not found') {
            res.status(404).json({ message: `No product found!` });
        } else if (product === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }

    async getProductsBySubCategoryID(req, res) {
        let subcategoryID = req.params.subcategoryID;
        let product = await service.getProductsBySubCategoryID(subcategoryID);
        if (product === 'not found') {
            res.status(404).json({ message: `No product found!` });
        } else if (product === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }

    async getProductsByVendorID(req, res) {
        let vendorID = req.params.vendorID;
        let product = await service.getProductsByVendorID(vendorID);
        if (product === 'not found') {
            res.status(404).json({ message: `No product found!` });
        } else if (product === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }

    async getProductBySKU(req, res) {
        let SKU = req.params.sku;
        let product = await service.getProductsBySKU(SKU);
        if (product === 'not found') {
            res.status(404).json({ message: `No product found!` });
        } else if (product === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }

    async getProductsByFilter(req, res) {
        let data = req.body;
        let products = await service.getProductsByFilter(data);
        if (products === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ products })
        }
    }

    async getProductsByFilterAndStatusAndPagination(req, res) {
        const data = req.body;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const offset = (pageNumber - 1) * pageSize;

        let result = await service.getProductsByFilterAndStatusAndPagination(data, offset, pageSize);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            result.currentPage = pageNumber;
            result.pageSize = pageSize;
            if (req.query.pageNumber > result.totalPages) {
                result.message = "You dont need another page";
                res.status(200).json({ result })
            } else {
                res.status(200).json({ result })
            }
        }
    }

    async addProduct(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let product = await service.addProduct(data);
            if (product === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (product === 'category not found') {
                res.status(404).json({ message: `Category not found!` });
            } else if (product === 'subcategory not found') {
                res.status(404).json({ message: `Subcategory not found!` });
            } else if (product === 'vendor not found') {
                res.status(404).json({ message: `Vendor not found!` });
            } else if (product === 'subcategory don\'t belong to that category'){
                res.status(404).json({ message: `Subcategory don't belong to that category!` });
            } else {
                res.status(200).json({ Message: "The product created successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async updateProduct(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let product = await service.updateProduct(id, data);
            if (product === null) {
                res.status(404).json({ message: `No product found!` })
            } else if (product === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ Message: "The product updated successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async changeProductStatus(req, res) {
        let id = req.params.id;
        let result = await service.changeProductStatus(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "No product found!" });
        } else {
            res.status(200).json({ message: 'Product status changed successfully' });
        }
    }

    async addProductImage(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addProductImage(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ message: "Product not found!" });
            } else {
                res.status(200).json({ message: 'Product image added successfully' });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }
}
module.exports = {
    ProductController
}