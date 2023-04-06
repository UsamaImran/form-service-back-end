/** @format */

const { buildSchema } = require('graphql')
const { Log } = require('./log')
const { IndexSettingInput } = require('./indexSetting')
const { Form } = require('./form')
const { Company } = require('./company')
const { Lookup, LookupQuery, LookupMutation } = require('./lookup')

const schema = `
enum PermissionType{
  admin,
  owner,
  view,
  edit,
}

type ResponseData{
  status:Int!
  message:String!
}

type User {
  _id: ID!
  email: String!
  password: String
  username: String!
  avatar: String!
  phone: String!
}

type AuthData {
  user: User!
  token: String!
}

input UserInput {
  email: String!
  password: String!
  username: String!
  avatar: String!
  phone: String!
}


${Log}
${IndexSettingInput}
${Form}
${Company}
${Lookup}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    getAllForms(limit: Int, offset:Int): [Form]!
    fetchUsers: [User!]!
    fetchUser(userId: String!): User!
    getIndexSetting: IndexSetting!
    fetchLogs(limit: Int, offset:Int): LogData!
    ${LookupQuery}
}

type RootMutation {
  createUser(userInput: UserInput): User
  createCompany(companyInput: CompanyInput!): Company!
  addLogNote(note: AddNote): Log!
  updateLogNote(note: UpdateNote): Log!
  deleteLogNote(note: DeleteNote): Log!
  addForm(formInput: FormInput): Form!
  deleteForm(id: [String!]!): ResponseData!
  addUserToForm(ids:[String!]!,userIds:[String!]!): ResponseData!
  updateFormPermission(id: [String!]!, userId: String!, access: PermissionType!): ResponseData!
  duplicateForm(id: String!): Form!
  updateForm(updateFormInput: FormUpdateInput!): Form!
  updateMultiForm(updateFormInput: [FormUpdateInput!]!): ResponseData!
  createIndexSetting(indexSetting: IndexSettingInput): IndexSetting!
  updateIndexSetting(input: UpdateIndexSettingInput! ): IndexSetting!
  updateIndexPermission(permission: PermissionInput): IndexSetting!
  ${LookupMutation}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`

module.exports = buildSchema(schema)
