const Category = require('../Models/categoryModel');
const cashClient = require('../redisClient');
class CategoryService{

    async getCategories(){
        try {
            let categories = await Category.find({});
            cashClient.set('categories', JSON.stringify(categories), 'EX', 3600, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key categories`);
                }
            });
            return categories;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getCategoryById(id){
        try {
            const category = await Category.findById(id);
            if (!category) {
                return 'not found';
            } else {
                cashClient.set(`category:${id}`, JSON.stringify(category), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key category by id`);
                    }
                });
                return category;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getCategoryByName(name){
        try {
            const category = await Category.findOne({name : name});
            if (!category) {
                return 'not found';
            } else {
                cashClient.set(`category:${name}`, JSON.stringify(category), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key category by name`);
                    }
                });
                return category;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addCategory(data){
        try {
            const category = await Category.findOne({name : data.name});
            if(category){
                return 'already exist';
            } else {
                const new_category = new Category(data);
                await new_category.save();
                return true;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async updateCategory(id, data){
        try {
            const category = await Category.findById(id);
            if (!category) {
                return 'not found';
            } else {
                return await Category.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changeCategoryStatus(id){
        try {
            const category = await Category.findById(id);
            if (!category) {
                return 'not found';
            } else {
                if (!category.isActive || category.isActive === false) {
                    return await Category.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await Category.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addCategoryImage(id, data){
        try {
            const category = await Category.findById(id);
            if (!category) {
                return 'not found';
            } else {
                return await Category.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

}
module.exports = {
    CategoryService
}