const mongoose = require('mongoose');
const { ROLE, ACTION } = require('../constants/enum');
const { createLog } = require('../graphql/resolvers/log');

const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
    return this.toString();
};

const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    subMenu: {
        type: String,
        required: true
    },
    tags: [String],
    canDuplicate: {
        type: Boolean,
        required: true
    },
    canView: {
        type: Boolean,
        required: true
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    lastEdited: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    permission: [
        {
            user: {
                type: Schema.Types.ObjectId,
                require: true,
                ref: 'User'
            },
            access: {
                type: String,
                enum: Object.values(ROLE),
                default: ROLE.View,
                require: true,
            }
        }
    ]
});

formSchema.post('save', (doc) => {
    onFormCreated(doc);
})
formSchema.post('findOneAndUpdate', (doc) => {
    console.log("Post Save", doc)
    onFormUpdated(doc)
})
formSchema.post("deleteMany", (doc) => {
    onFormDeleted(doc)
})

module.exports = mongoose.model('Form', formSchema);

const onFormCreated = (doc) => {
    try {
        createLog({
            logInput: {
                userId: doc.createdBy,
                action: ACTION.Add,
                path: "System Management -> Create Form",
                setting: "",
                subPath: "",
                oldValue: "",
                newValue: "",
                note: "",
                entityId: doc.id,
                entityName: doc.name,
            }
        })
    } catch (err) {
        console.log(err);
    }

}

const onFormUpdated = (doc) => {

}

const onFormDeleted = (doc) => {

}