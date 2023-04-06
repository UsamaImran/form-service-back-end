const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const logSchema = new Schema({
    date: String,
    hour: String,
    userId: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    department: String,
    entityId: String,
    entityName: String,
    action: String,
    setting: String,
    path: String,
    subPath: String,
    oldValue: String,
    newValue: String,
    createdAt: String,
    notes: [{
        note: String,
        editedAt: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    }]
});

module.exports = mongoose.model('Log', logSchema);
