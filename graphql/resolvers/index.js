/** @format */

const authResolver = require('./auth')
const companyResolver = require('./company')
const formResolver = require('./form')
const indexSettingResolver = require('./indexSettings')
const logResolver = require('./log')
const lookup = require('./lookup')

const rootResolver = {
    ...authResolver,
    ...logResolver,
    ...indexSettingResolver,
    ...formResolver,
    ...companyResolver,
    ...lookup,
}

module.exports = rootResolver
