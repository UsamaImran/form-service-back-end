/** @format */

const IndexSetting = require("../../models/indexSetting");
const { throwErrorIfNull } = require("../../helpers/utils");
const {
  DEFAULT_COLUMNS,
  ROW_ACTIONS_DEFAULT,
  PERMISSIONS_DEFAULT,
} = require("../../constants/indexSettings");
const { dateToString } = require("../../helpers/date");

const getIndexSettingsById = async (id) => {
  const indexSettings = await IndexSetting.findById(id);
  return indexSettings;
};

const getIndexSetting = async (id) => {
  const indexSettings = await IndexSetting.findOne({}, [], { sort: { 'createdDate': 1 } });
  return indexSettings;
};

const createIndexSetting = async (args, req) => {
  try {
    const users = [req.userId]
    const { title, logged } = args.indexSetting;
    const columns = [...DEFAULT_COLUMNS];
    const rowAction = [...ROW_ACTIONS_DEFAULT];
    const permissions = { ...PERMISSIONS_DEFAULT };

    permissions.users = [...users];
    permissions.logged = logged;

    const payload = {
      title,
      columns,
      rowAction,
      permissions: permissions,
      createdDate: dateToString(new Date())
    };

    const result = new IndexSetting({ ...payload });

    await result.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const updateIndexColumn = async (args) => {
  try {

    const { id, columns } = args;

    if (action.length !== 4) {
      throw Error("Invalid Actions")
    }

    const result = await IndexSetting.findOneAndUpdate(
      { _id: id },
      { $set: { 'columns': columns } },
      { new: true }
    );

    // const { name, label, hidden, maxWidth, indexId } = args.column;

    // const payload = { name, label, hidden, maxWidth };

    // const result = await IndexSetting.findOneAndUpdate(
    //   { _id: indexId },
    //   { $push: { columns: payload } },
    //   { new: true }
    // )

    throwErrorIfNull(result);

    return result;
  } catch (err) {
    throw err;
  }
};

// const updateIndexAction = async (args) => {
//   try {
//     const { id, action } = args;

//     if (action.length !== 4) {
//       throw Error("Invalid Actions")
//     }

//     const result = await IndexSetting.findOneAndUpdate(
//       { _id: id },
//       { $set: { 'rowAction': action } },
//       { new: true }
//     )
//     // const { type, action, status, indexId } = args.action;

//     // const lowerCaseType = ROW_SELECTION[type]

//     // let objectToSet = {};
//     // objectToSet[`rowAction.$.${lowerCaseType}`] = status

//     // const result = await IndexSetting.findOneAndUpdate(
//     //   { _id: indexId, 'rowAction.action': ROW_ACTION[action] },
//     //   { $set: objectToSet },
//     //   { new: true })

//     throwErrorIfNull(result);

//     return result;
//   } catch (err) {
//     throw err;
//   }

// };

// const updateIndexPermission = async (args) => {

//   try {
//     const { users, indexId } = args.permission;

//     const payload = [...users];

//     const result = await IndexSetting.findOneAndUpdate(
//       { _id: indexId },
//       { $push: { "permissions.users": payload } },
//       { new: true })

//     throwErrorIfNull(result);

//     return result
//   } catch (err) {
//     throw err;
//   }

// };

const updateIndexSetting = async (args) => {

  try {
    const { id } = args.input;
    const params = { ...args.input }
    delete params.id;

    const result = await IndexSetting.findOneAndUpdate(
      { _id: id },
      { $set: { ...params } },
      { new: true }
    )

    throwErrorIfNull(result);

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createIndexSetting,
  updateIndexColumn,
  getIndexSetting,
  // updateIndexAction,
  // updateIndexPermission,
  updateIndexSetting,
};
