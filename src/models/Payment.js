const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//status 
//0 = ยังไม่จ่าย 1 = กำลังดำเนินการ  2 = สำเร็จ 3 = ยกเลิก

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
    pic : {
        type : String,
        default : ""
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