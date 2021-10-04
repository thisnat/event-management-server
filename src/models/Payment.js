const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentSchema = new Schema({
    zoneId : {
        type : String
    },
    zoneName : {
        type : String
    },
    zonePrice : {
        type : String
    },
    eventName : {
        type : String
    },
    eventId : {
        type : String
    },
    reserveId : {
        type : String
    },
    username : {
        type : String
    },
    status : {
        type : Number,
        default : 0
    },
    craete_at : {
        type : Date,
        default : Date.now()
    },
    update_at : {
        type : Date,
        default : Date.now()
    },
}, {
    collection: "payments"
})

module.exports = mongoose.model('payment', paymentSchema);