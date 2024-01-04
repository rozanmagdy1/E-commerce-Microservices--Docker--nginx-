const Vendor = require('../Models/vendorModel');
const cashClient = require('../redisClient');
const bcrypt = require('bcryptjs');

class VendorService{
    async getAllVendors(){
        try {
            let vendors = await Vendor.find({});
            cashClient.set('vendors', JSON.stringify(vendors), 'EX', 60, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key vendors`);
                }
            });
            return vendors;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getVendorById(id){
        try {
            const vendor = await Vendor.findById(id);
            if (!vendor) {
                return 'not found';
            } else {
                cashClient.set(`vendor:${id}`, JSON.stringify(vendor), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key vendor by id`);
                    }
                });
                return vendor;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getVendorByName(name){
        try {
            const vendor = await Vendor.findOne({name : name});
            if (!vendor) {
                return 'not found';
            } else {
                cashClient.set(`vendor:${name}`, JSON.stringify(vendor), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key vendor by name`);
                    }
                });
                return vendor;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addVendor(data){
        data.isAdmin = false;
        data.password = await bcrypt.hash(data.password, 10);
        try {
            const vendor = await Vendor.findOne({name : data.name});
            if (vendor){
                return 'already exist';
            } else {
                const new_vendor = new Vendor(data);
                await new_vendor.save();
                return true;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async updateVendorById(id, data){
        try {
            const vendor = await Vendor.findById(id);
            if (!vendor) {
                return 'not found';
            } else {
                return await Vendor.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changeVendorStatusById(id){
        try {
            const vendor = await Vendor.findById(id);
            if (!vendor) {
                return 'not found';
            } else {
                if (!vendor.isActive || vendor.isActive === false) {
                    return await Vendor.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await Vendor.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addVendorMainImage(id, data){
        try {
            const vendor = await Vendor.findById(id);
            if (!vendor) {
                return 'not found';
            } else {
                return await Vendor.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addVendorImage(id, data){
        try {
            const vendor = await Vendor.findById(id);
            if (!vendor) {
                return 'not found';
            } else {
                return await Vendor.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

}
module.exports = {
    VendorService
}