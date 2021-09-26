const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let joinSchema = new Schema({
    eventId: {
        type: String
    },
    eventName : {
        type: String
    },
    userId: {
        type: String
    },
    username: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "joins"
});

module.exports = mongoose.model('join', joinSchema);