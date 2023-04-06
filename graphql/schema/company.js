
const companyFragment = `
name : String!
`
const Company = `
    type Company {
        ${companyFragment}
    }

    input CompanyInput {
        name : String!
    }

`

module.exports = {
    Company
}