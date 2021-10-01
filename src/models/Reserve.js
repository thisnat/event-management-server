const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reserveSchema = new Schema({
    host: {
        type: String
    },
    eventId: {
        type: String
    },
    paymentInfo: {
        type: String
    },
    info: {
        type: String
    },
    pic: {
        type: String
    },
    isZoneSet: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
}, {
    collection: "reserves"
});

module.exports = mongoose.model('reserve', reserveSchema);