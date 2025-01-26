const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    apiName: { type: String, required: true },
    requestData: { type: Object, required: true },
    responseData: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema);
