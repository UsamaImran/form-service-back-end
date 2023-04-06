/** @format */

const Company = require("../../models/company");

const createCompany = async (args) => {
    try {
        const { name } = args.companyInput;

        const company = new Company({
            name,
        });
        const result = await company.save();
        return result;
    } catch (err) {
        throw err;
    }
};

const updateCompany = async (args) => {
    try {
        const { id, userId } = args.companyInput;

        const result = Company.findOneAndUpdate({ _id: id },
            {
                $push: { 'users': userId }
            },
            { new: true }
        )
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createCompany,
    updateCompany
};
