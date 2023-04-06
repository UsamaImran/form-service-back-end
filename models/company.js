const { dateToString } = require('../helpers/date');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    parentCompany: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    createdAt: {
        type: String,
        default: dateToString(new Date())
    }
});

module.exports = mongoose.model('Company', companySchema);
