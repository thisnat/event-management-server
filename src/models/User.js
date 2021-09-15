const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    isOrg: {
        type: Boolean
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        default: "active"
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    },
}, {
    collection: "users"
});

module.exports = mongoose.model('user', userSchema);