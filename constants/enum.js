const ROLE = Object.freeze({
    Admin: 'admin',
    Owner: 'owner',
    View: 'view',
    Edit: 'edit'
})

const ROW_ACTION = Object.freeze({
    Duplicate: 'duplicate',
    Delete: 'delete',
    Tag: "tag",
    Permission: 'permission'
})

const ROW_SELECTION = Object.freeze({
    SINGLE: 'single',
    GROUP: 'group'
})

const ACTION = Object.freeze({
    Add: 'add',
    change: 'change',
    Delete: 'delete'
})

module.exports = {
    ROLE,
    ROW_ACTION,
    ROW_SELECTION,
    ACTION,
}