/** @format */

const UserModifications = `
    createdBy: User!
    createdAt: String!
    editedBy: User!
    lastEdited: String!
`;
const lookupFragment = `
    name:String!
    isActive: Boolean!
    tags:[String!]!
    description:String!
`;
const Lookup = `

    enum RelationshipType{
        add,
        change,
        delete,
    }
    type Lookup {
        id: ID!
        ${lookupFragment}
        action:String!
        canDuplicate:Boolean!
        canView: Boolean!
        ${UserModifications}
        permission:[FormPermission!]!
    }

    type LookupValue {
        id:ID!
        isActive:Boolean!
        name:String!
        icon:String!
        order:Int!
        lookupId:String!
        ${UserModifications}
    }

    type LookupRelationship{
        lookup:Lookup!
        lookupValue:LookupValue!
        childLookup:Lookup!
        childLookupValue:LookupValue!
    }
    input LookupInput {
        name:String!
        isActive: Boolean!
        tags: [String!]
        description:String 
    }
    input LookupUpdateInput {
        id:ID!
        name:String
        isActive: Boolean
        tags: [String!]
        description:String 
        permission:[FormPermissionInput!]
    }
    input LookupValueInput {
        name:String!
        isActive: Boolean!
        icon:String
        order:Int!
        lookupId:String!
    }
    input LookupValueUpdateInput {
        id:ID!
        name:String
        isActive: Boolean
        icon:String
        order:Int
        canDuplicate:Boolean
        canView: Boolean
    }
    input LookupRelationshipInput {
        lookup:String!
        lookupValue:String!
        childLookup:String!
        childLookupValue:String!
        status:RelationshipType!
    }
`;
const LookupQuery = `
    fetchLookup(limit: Int, offset:Int): [Lookup!]!
    fetchLookupValue(id:String!): [LookupValue!]!
    fetchLookupRelationship(id:String!):[LookupRelationship!]!
`
const LookupMutation = `
    createLookup(input: LookupInput!): Lookup!
    updateLookup(input: LookupUpdateInput!): Lookup!
    deleteLookup(id:[String!]!): ResponseData!
    createLookupValue(input: LookupValueInput!) : LookupValue!
    createLookupValues(input: [LookupValueInput!]!) : [LookupValue!]!
    updateLookupValue(input: LookupValueUpdateInput!) : LookupValue!
    deleteLookupValue(id:[String!]!): ResponseData!
    createRelationship(input:[LookupRelationshipInput!]! ) : ResponseData!
`
module.exports = {
    Lookup,
    LookupQuery,
    LookupMutation
};
