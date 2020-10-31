const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        required: true,
        type:String
    },
    email: {
        required: true,
        type:String
    },
    password: {
        required: true,
        type:String
    },
    phone: {
        required: true,
        type:String
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

const User = mongoose.model('user', UserSchema);
 
module.exports = User;