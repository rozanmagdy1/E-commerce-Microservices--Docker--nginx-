const { validationResult } = require('express-validator');
let { VendorService } = require("../Services/vendorService");
let service = new VendorService();
class VendorController{

    async getAllVendors(req,res){
        let vendors = await service.getAllVendors();
        if (vendors === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ vendors });
        }
    }

    async getVendorById(req,res){
        let id = req.params.id;
        let vendor = await service.getVendorById(id);
        if (vendor === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (vendor === 'not found') {
            res.status(404).json({ message: "Vendor not found!" });
        } else {
            res.status(200).json({ vendor });
        }
    }

    async getVendorByName(req,res){
        let name = req.params.name;
        let vendor = await service.getVendorByName(name);
        if (vendor === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (vendor === 'not found') {
            res.status(404).json({ message: "Vendor not found!" });
        } else {
            res.status(200).json({ vendor });
        }
    }

    async addVendor(req,res){
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addVendor(data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'already exist'){
                res.status(403).json({ message: "Vendor already exists, use another name" });
            } else {
                res.status(200).json({ message: "Vendor added successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async updateVendorById(req,res){
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.updateVendorById(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ Message: "Vendor not found!" });
            } else {
                res.status(200).json({ Message: "Vendor data updated successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async changeVendorStatusById(req,res){
        let id = req.params.id;
        let result = await service.changeVendorStatusById(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "Vendor not found!" });
        } else {
            res.status(200).json({ message: 'Vendor status changed successfully' });
        }
    }

    async addVendorImage(req,res){
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addVendorImage(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ message: "Vendor not found!" });
            } else {
                res.status(200).json({ message: 'Vendor image added successfully' });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }


}
module.exports = {
    VendorController
}