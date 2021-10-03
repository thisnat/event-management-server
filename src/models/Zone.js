const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let zoneSchema = new Schema({
    eventId: {
        type: String
    },
    eventName: {
        type: String
    },
    reserveId: {
        type: String
    },
    name: {
        type: String
    },
    owner: {
        type: String,
        default : ""
    },
    price: {
        type: Number
    },
    isReserve : {
        type : Boolean,
        default : false
    }
}, {
    collection: "zones"
})

module.exports = mongoose.model('zone', zoneSchema);