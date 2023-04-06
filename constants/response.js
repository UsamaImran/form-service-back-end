const SUCCESSFUL_RESPONSE = {
    status: 200,
    message: "Operation Successful"
}
const INTERNAL_SERVER_ERROR_RESPONSE = {
    status: 500,
    message: "Internal Server Error"
}

const NOT_FOUND_RESPONSE = {
    status: 404,
    message: "Not Found",
};

const UNAUTHORIZED_RESPONSE = {
    status: 401,
    message: "Unauthorized",
};

const FORBIDDEN_RESPONSE = {
    status: 403,
    message: "Operation Forbidden",
};

const CREATION_RESPONSE = {
    status: 201,
    message: "Resource Created",
};

const UNPROCESSABLE_RESPONSE = {
    status: 422,
    message: "Cannot Be Processed",
};
module.exports = {
    SUCCESSFUL_RESPONSE,
    INTERNAL_SERVER_ERROR_RESPONSE,
    NOT_FOUND_RESPONSE,
    UNAUTHORIZED_RESPONSE,
    UNPROCESSABLE_RESPONSE,
    CREATION_RESPONSE,
    FORBIDDEN_RESPONSE,

}