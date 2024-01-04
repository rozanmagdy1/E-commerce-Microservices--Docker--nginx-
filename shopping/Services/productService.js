const Product = require('../Models/productModel');
const SubCategory = require('../Models/subcategoryModel');
const Category = require('../Models/categoryModel');
const Vendor = require('../Models/vendorModel');
const cashClient = require('../redisClient');
class ProductService {

    async getAllProducts() {
        try {
            let products = await Product.find({});
            cashClient.set('products', JSON.stringify(products), 'EX', 60, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key products`);
                }
            });
            return products
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }


    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return 'not found';
            } else {
                cashClient.set(`product:${id}`, JSON.stringify(product), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for product by id`);
                    }
                });
                return product;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsByCategoryID(categoryID){
        try {
            const products = await Product.find({ categoryID : categoryID });
            if (!products) {
                return 'not found';
            } else {
                cashClient.set(`products_category:${categoryID}`, JSON.stringify(products), 'EX', 60, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key products_category by id`);
                    }
                });
                return products;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsBySubCategoryID(subcategoryID){
        try {
            const products = await Product.find({ subcategoryID : subcategoryID });
            if (!products) {
                return 'not found';
            } else {
                cashClient.set(`products_subcategory:${subcategoryID}`, JSON.stringify(products), 'EX', 60, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key products_subcategory by id`);
                    }
                });
                return products;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsByVendorID(vendorID){
        try {
            const products = await Product.find({ vendorID : vendorID });
            if (!products) {
                return 'not found';
            } else {
                cashClient.set(`products_vendor:${vendorID}`, JSON.stringify(products), 'EX', 60, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key products_vendor by id`);
                    }
                });
                return products;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsBySKU(SKU){
        try {
            const product = await Product.findOne({ SKU : SKU });
            if (!product) {
                return 'not found';
            } else {
                cashClient.set(`product_sku:${SKU}`, JSON.stringify(product), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for product by sku`);
                    }
                });
                return product;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsByFilter(data){
        try {
            const products = await Product.find(data);
            if (!products) {
                return 'not found';
            } else {
                return products;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async getProductsByFilterAndStatusAndPagination(data,offset,pageSize){
        try{
            const products = await Product.find(data).skip(offset).limit(pageSize);
            const totalCount = await Product.countDocuments();
            return {
                data: products,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            }
        }catch(err){
            console.error(err);
            return 'error';
        }
    }

    async addProduct(data) {
        try {
            const category = await Category.findById(data.categoryID);
            const sub_category = await SubCategory.findById(data.subcategoryID);
            const vendor = await Vendor.findById(data.vendorID);
            if (!category){
                return 'category not found';
            } else if (!sub_category){
                return 'subcategory not found';
            } else if (!vendor){
                return 'vendor not found';
            } else if (sub_category.categoryID !== category._id.toString()){
                return 'subcategory don\'t belong to that category';
            } else {
                const product = new Product(data);
                await product.save();
                return product;
            }
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async updateProduct(id, data) {
        try {
            const product = await Product.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
            if (!product) {
                return 'not found';
            }
            return product;
        } catch (err) {
            console.error(err);
            return 'error';
        }
    }

    async changeProductStatus(id){
        try {
            const product = await Product.findById(id);
            if (!product) {
                return 'not found';
            } else {
                if (!product.isActive || product.isActive === false) {
                    return await Product.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await Product.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addProductImage(id, data){
        try {
            const product = await Product.findById(id);
            if (!product) {
                return 'not found';
            } else {
                return await Product.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

}
module.exports = {
    ProductService
}