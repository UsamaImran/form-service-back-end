/** @format */

const permissionFragment = `
logged: Boolean!
users: [String]!
`;

const columnFragment = `

name: String!
defaultLabel: String!
label: String!
hidden: Boolean!
maxWidth: String!
`;
const IndexSettingInput = `

    enum SelectionType {
        single
        group
    }
    enum ActionType {
        duplicate
        delete
        tag
        permission
    }
    type Column {
        ${columnFragment}
    }
    type Action {
        type: SelectionType!
        action: ActionType!
        status: Boolean!
    }
    type RowAction{
        action: ActionType!
        single: Boolean!
        group: Boolean!
    }
    type Permission {
        ${permissionFragment}
    }
    type IndexSetting {
        id: String!
        title:String!
        columns : [Column]!
        rowAction: [RowAction]!
        permissions : Permission!
    }
    input ActionInput {
        action: ActionType!
        single:Boolean!
        group: Boolean!
    }
    input PermissionInput {
        users: [String]!
        indexId: String!
    }
    input AddColumnInput {
        ${columnFragment}
    }

    input UpdateIndexSettingInput{
        id: ID!
        title: String
        columns: [AddColumnInput]
        rowAction:[ActionInput]
    }
    input IndexSettingInput {
        title: String!
        logged: Boolean!
    }
`;

module.exports = {
    IndexSettingInput,
};
