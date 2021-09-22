const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    name:{
        type: String
    },
    host:{
        type: String
    },
    color:{
        type: String
    },
    emoji:{
        type: String
    },
    date:{
        type: String
    },
    time:{
        type: String
    },
    location:{
        type: String
    },
    about:{
        type: String
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
    collection: "events"
});

module.exports = mongoose.model('event', eventSchema);