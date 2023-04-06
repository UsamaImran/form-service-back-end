const { ROLE } = require('../../constants/enum');
const { SUCCESSFUL_RESPONSE, INTERNAL_SERVER_ERROR_RESPONSE } = require('../../constants/response');
const { dateToString } = require('../../helpers/date');
const { throwErrorIfNull, getPageFilter } = require('../../helpers/utils');
const Form = require('../../models/form');

const addForm = async (args, req) => {
    try {
        const userId = req.userId;
        const { formInput } = args;
        const { name, menu, subMenu, tags } = formInput;
        const form = new Form({
            name: name,
            menu: menu,
            subMenu: subMenu,
            tags: [...tags],
            editedBy: userId,
            createdBy: userId,
            canDuplicate: true,
            canView: true,
            lastEdited: dateToString(new Date()),
            createdDate: dateToString(new Date()),
            permission: [{
                user: userId,
                access: ROLE.Owner,
            }]
        })
        let result = await form.save();

        // result = await form.populate('editedBy').execPopulate()
        return result;
    } catch (err) {
        throw err;
    }
}

const duplicateForm = async (args) => {
    const { id } = args;
    const form = await Form.findById(id);
    const result = await addForm({
        formInput: form,
    });

    return result;
};

const deleteForm = async (args) => {

    const { id } = args;
    const result = await Form.deleteMany({ _id: { $in: [...id] } });

    throwErrorIfNull(result, 'n');
    return { ...SUCCESSFUL_RESPONSE }
}

const updateForm = async (args) => {
    const { id } = args.updateFormInput;
    const params = { ...args.updateFormInput }
    delete params.id;
    // const tags = updateFormInput.tags;
    // if (updateFormInput.tags) {
    //     delete updateFormInput.tags;
    // }

    const form = Form.findOneAndUpdate({ _id: id },
        {
            $set: { ...params },
            // ...(tags && { $push: { 'tags': { $each: tags } } })
        },
        { new: true }
    )

    return form;
}

const updateMultiForm = async (args) => {

    try {
        const allPromise = [];
        const forms = [...args.updateFormInput]
        for (let i = 0; i < forms.length; i++) {
            allPromise.push(updateForm({
                updateFormInput: {
                    ...forms[i]
                }
            }))
        }
        await Promise.all(allPromise);
        return {
            ...SUCCESSFUL_RESPONSE
        };
    } catch (err) {
        throw INTERNAL_SERVER_ERROR_RESPONSE
    }

}

const addUserToForm = async (args) => {

    const { ids, userIds } = args;

    const permissionUsers = userIds.map((id) => {
        return {
            user: id,
            access: ROLE.View,
        }
    })

    await Form.updateMany(
        { _id: { $in: [...ids] } },
        { $push: { 'permission': { $each: permissionUsers } } },
        { new: true }
    )

    return { ...SUCCESSFUL_RESPONSE };

}
const updateFormPermission = async (args, req) => {
    const userId = req.userId
    const { id, access } = args;

    const result = await Form.updateMany(
        { _id: { $in: [...id] }, 'permission.user': userId },
        { $set: { 'permission.$.access': access }, },
        { new: true }
    )
    throwErrorIfNull(result, 'nModified');
    return { ...SUCCESSFUL_RESPONSE };
}

const getAllForms = async (args) => {

    try {
        const { offset, limit } = args;
        const filter = getPageFilter(limit, offset);
        const result = await Form.find({}, {},
            filter
        ).populate("permission.user").populate("createdBy")

        return result;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addForm: addForm,
    deleteForm: deleteForm,
    duplicateForm: duplicateForm,
    updateFormPermission,
    getAllForms,
    addUserToForm,
    updateForm,
    updateMultiForm,
};
