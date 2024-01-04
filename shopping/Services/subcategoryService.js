const SubCategory = require('../Models/subcategoryModel');
const Category = require('../Models/categoryModel');
const cashClient = require('../redisClient');
class SubCategoryService {
    async getSubCategories() {
        try {
            let subcategories = await SubCategory.find({});
            cashClient.set('subcategories', JSON.stringify(subcategories), 'EX', 3600, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key subcategories`);
                }
            });
            return subcategories;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getSubCategoryById(id) {
        try {
            const subcategory = await SubCategory.findById(id);
            if (!subcategory) {
                return 'not found';
            } else {
                cashClient.set(`subcategory:${id}`, JSON.stringify(subcategory), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key subcategory by id`);
                    }
                });
                return subcategory;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getSubCategoriesByCategoryID(id) {
        try {
            const subcategories = await SubCategory.find({ categoryID: id });
            if (!subcategories) {
                return 'not found';
            } else {
                cashClient.set(`subcategory_category:${id}`, JSON.stringify(subcategories), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key subcategory_category by id`);
                    }
                });
                return subcategories;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getSubCategoriesByCategoryName(name) {
        try {
            const category = await Category.findOne({ name: name });
            if (!category) {
                return 'category not found';
            } else {
                const subcategories = await SubCategory.find({ categoryID: category.id });
                if (!subcategories) {
                    return 'subcategory not found';
                } else {
                    cashClient.set(`subcategory_category:${name}`, JSON.stringify(subcategories), 'EX', 3600, (error, result) => {
                        if (error) {
                            console.error('Error setting cache with expiration:', error);
                        } else {
                            console.log(`Cache set with expiration for key subcategory_category by name`);
                        }
                    });
                    return subcategories;
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getSubCategoryByName(name) {
        try {
            const subcategory = await SubCategory.findOne({ name: name });
            if (!subcategory) {
                return 'not found';
            } else {
                cashClient.set(`subcategory:${name}`, JSON.stringify(subcategory), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key subcategory by name`);
                    }
                });
                return subcategory;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addSubCategory(data) {
        try {
            const sub_category = await SubCategory.findOne({name : data.name});
            if (sub_category){
                return 'already exist';
            } else {
                const category = await Category.findById(data.categoryID);
                if (!category){
                    return 'category not found';
                } else {
                    const new_subcategory = new SubCategory(data);
                    await new_subcategory.save();
                    return true;
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async updateSubCategory(id, data) {
        try {
            const subcategory = await SubCategory.findById(id);
            if (!subcategory) {
                return 'not found';
            } else {
                return await SubCategory.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changeSubCategoryStatus(id) {
        try {
            const subcategory = await SubCategory.findById(id);
            if (!subcategory) {
                return 'not found';
            } else {
                if (!subcategory.isActive || subcategory.isActive === false) {
                    return await SubCategory.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await SubCategory.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addSubCategoryImage(id, data) {
        try {
            const subcategory = await SubCategory.findById(id);
            if (!subcategory) {
                return 'not found';
            } else {
                return await SubCategory.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }
}
module.exports = {
    SubCategoryService
}