const { ROLE } = require("./enum")

const UNAUTHORIZED_ROUTES = [
    'login',
    'createUser'
]


const UPDATE_PERMISSION = [ROLE.Admin, ROLE.Owner, ROLE.Edit]
const CD_PERMISSION = [ROLE.Admin, ROLE.Owner]

module.exports = {
    UNAUTHORIZED_ROUTES,
    UPDATE_PERMISSION,
    CD_PERMISSION,
}