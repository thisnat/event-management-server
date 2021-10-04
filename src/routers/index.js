const UserRouter = require('./UserRouter');
const EventRouter = require('./EventRouter');
const JoinRouter = require('./JoinRouter');
const ReserveRouter = require('./ReserveRouter');
const ZoneRouter = require('./ZoneRouter');
const PaymentRouter = require('./PaymentRouter');

const routes = {
    UserRouter, EventRouter, JoinRouter, ReserveRouter, ZoneRouter, PaymentRouter
};

module.exports = routes;