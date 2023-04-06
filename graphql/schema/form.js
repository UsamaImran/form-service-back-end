
const formFragment = `
name : String!
menu : String!
subMenu : String!
tags: [String]! 
`
const Form = `

    type FormPermission{
        id: ID!
        user: User!
        access: PermissionType!
    }
    type Form {
        id: ID!
        ${formFragment}
        canDuplicate: Boolean!
        canView: Boolean!
        createdBy: User!
        editedBy: ID!
        lastEdited: String!
        createdDate:ID!
        permission:[FormPermission]!
    }

    input FormPermissionInput{
        user: ID!
        access: PermissionType!
    }
    input FormUpdateInput{
        id: ID!
        name : String
        menu : String
        subMenu : String
        tags: [String]
        canDuplicate: Boolean
        canView: Boolean
        permission: [FormPermissionInput]
    }

    input FormInput {
        ${formFragment}
    }

`

module.exports = {
    Form
}