const mongoose = require('mongoose');
const { ROLE } = require('../constants/enum');

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    action: String,
    tags: [String],
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    canDuplicate: {
        type: Boolean,
        required: true,
        default: true,
    },
    canView: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: String,
        required: true
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lastEdited: {
        type: String,
        required: true
    },
    permission: [
        {
            user: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            access: {
                type: String,
                enum: Object.values(ROLE),
                default: ROLE.View,
                required: true,
            }
        }
    ]
});

const lookupValueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    icon: String,
    order: {
        type: Number,
        required: true,
        default: 0,
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    lookupId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Lookup'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: String,
        required: true
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lastEdited: {
        type: String,
        required: true
    },
});

const lookupRelationshipSchema = new Schema({
    lookup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Lookup'
    },
    lookupValue:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'LookupValue'
    },
    childLookup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Lookup'
    },
    childLookupValue:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'LookupValue'
    },
    createdAt: {
        type: String,
        required: true
    },
});

lookupSchema.post('save', (doc) => {
    onLookupCreated(doc);
})
lookupSchema.post('findOneAndUpdate', (doc) => {
    onLookupUpdated(doc)
})
lookupSchema.post("deleteMany", (doc) => {
    onLookupDeleted(doc)
})

module.exports = {
    Lookup: mongoose.model('Lookup', lookupSchema),
    LookupValue: mongoose.model('LookupValue', lookupValueSchema),
    LookupRelation: mongoose.model('LookupRelationship', lookupRelationshipSchema)
}

const onLookupCreated = (doc) => {
    try {
    } catch (err) {
        console.log(err);
    }

}

const onLookupUpdated = (doc) => {

}

const onLookupDeleted = (doc) => {

}