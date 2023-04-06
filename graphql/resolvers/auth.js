const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLE } = require('../../constants/enum');
const User = require('../../models/user');
const { getDefaultCompany, parseError } = require("../../helpers/utils")
const { NOT_FOUND_RESPONSE } = require('../../constants/response')
const { createCompany, updateCompany } = require("./company")

const fetchUsers = async () => {
  try {
    const users = await User.find();
    return users;
  }
  catch (err) {

  }
}
const fetchUser = async (args) => {
  try {
    const { userId } = args
    const user = await User.findOne({ _id: userId });
    return user;
  }
  catch (err) {

  }
}

const createUser = async args => {
  try {
    const existingUser = await User.findOne({ email: args.userInput.email });
    if (existingUser) {
      throw new Error('User exists already.');
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

    const company = await createCompany({ companyInput: { name: "New Company" } })
    const user = new User({
      email: args.userInput.email,
      password: hashedPassword,
      username: args.userInput.username,
      avatar: args.userInput.avatar || 'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png',
      phone: args.userInput.phone,
      sub: [
        {
          subId: company.id,
          role: ROLE.Admin,
          default: true,
        }
      ]
    });

    const result = await user.save();
    await updateCompany({ companyInput: { id: company.id, userId: result.id } })

    return { ...result._doc, password: null, _id: result.id };
  } catch (err) {
    throw err;
  }
}
const login = async ({ email, password }, req, res) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw { ...NOT_FOUND_RESPONSE, message: "User not found" }
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw { ...NOT_FOUND_RESPONSE, message: "Wrong password" }
    }
    const defaultCompany = getDefaultCompany(user.sub);
    const token = jwt.sign(
      { userId: user.id, email: user.email, companyId: defaultCompany?.subId, role: defaultCompany?.role },
      process.env.JWT,
      {
        expiresIn: '1d'
      }
    );
    return { user: { ...user._doc }, token: token };
  } catch (err) {
    const error = parseError(err);
    throw JSON.stringify(error)
  }

}
module.exports = {
  createUser,
  login,
  fetchUsers,
  fetchUser,
};
