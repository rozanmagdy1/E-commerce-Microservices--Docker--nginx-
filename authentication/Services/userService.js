const User = require('../Models/userModel');
const { extractInfoFromToken } = require('./extractInfoFromTokenService');
const bcrypt = require('bcryptjs');
const cashClient = require('../redisClient');

class UserService {
    async getProfile(token) {
        try {
            let data_from_token = await extractInfoFromToken(token);
            let [, id,] = data_from_token;
            let user = await User.findById(id);   

            cashClient.set('user_profile', JSON.stringify(user), 'EX', 3600, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key user_profile`);
                }
            });
            return user;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getAllUsers() {
        try {
            let users = await User.find({});
            cashClient.set('users', JSON.stringify(users), 'EX', 60, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key users`);
                }
            });
            return users;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return 'not found';
            } else {
                cashClient.set(`user:${id}`, JSON.stringify(user), 'EX', 3600, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key user by id`);
                    }
                });
                return user;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addUser(data) {
        try {
            const user = await User.findOne({ "email": data.email });
            if (!user) {
                data.password = await bcrypt.hash(data.password, 10);
                data.verified = false;
                const new_user = new User(data);
                await new_user.save();
                return true;
            } else {
                return "username already exist";
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async updateUserById(id, data) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return 'not found';
            } else {
                return await User.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changeUserStatusById(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return 'not found';
            } else {
                if (!user.isActive || user.isActive === false) {
                    return await User.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await User.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async addProfileImage(id, data) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return 'not found';
            } else {
                return await User.updateOne({ _id: id }, data);
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }


}
module.exports = {
    UserService
}