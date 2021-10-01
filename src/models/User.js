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
    pic: {
        type: String,
    },
    about: {
        type: String,
        default: "Hello world"
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "users"
});

userSchema.pre('save', function (next) {
    this.pic = `https://avatars.dicebear.com/api/micah/${this.get('username')}.svg?background=%23ede1be`; 
    next();
});

module.exports = mongoose.model('user', userSchema);