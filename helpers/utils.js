/** @format */
const { INTERNAL_SERVER_ERROR_RESPONSE } = require('../constants/response')
const deepCopyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const getPageFilter = (limit, offset) => {
    const filter = offset !== undefined && limit !== undefined && limit > 0 ? { skip: ((offset) * limit), limit: limit } : {}
    return filter
}
const throwErrorIfNull = (obj, attribute, message) => {
    if (obj === null || obj === undefined || obj[attribute] === 0) {
        throw Error(message || "No Record found!")
    }
}
const throwErrorIfNullArray = (array) => {
    if (array && array.length > 0) {
        return;
    }
    throw Error("No Record found!")
}

const throwPermissionError = (roles, userRole) => {
    const hasPermission = roles.filter((role) => {
        return role === userRole
    }).length > 0
    if (!hasPermission)
        throw Error("Access Restricted")
}
const getDefaultCompany = (companies) => {
    return companies.find((company) => {
        return company.default
    })
}

const parseError = (error) => {
    if (error.status) {
        return error;
    }
    return {
        ...INTERNAL_SERVER_ERROR_RESPONSE
    }
}
module.exports = {
    deepCopyObject,
    throwErrorIfNull,
    throwErrorIfNullArray,
    getPageFilter,
    getDefaultCompany,
    parseError,
    throwPermissionError,
};
