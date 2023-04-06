/** @format */

const { dateToString, date, time } = require("../../helpers/date");
const { throwErrorIfNull, getPageFilter } = require("../../helpers/utils");
const Log = require("../../models/log");
const User = require("../../models/user");

const createLog = async (args) => {
  try {
    const { logInput } = args;
    const { userId, entityId, entityName, action, path, setting, subPath, oldValue, newValue } = logInput;

    // const creator = await User.findById(userId);
    const log = new Log({
      date: date(new Date()),
      hour: time(new Date()),
      userId: userId,
      user: userId,
      department: '',
      action: action,
      setting: setting,
      path: path,
      subPath: subPath,
      oldValue: oldValue,
      newValue: newValue,
      entityId,
      entityName,
      createdAt: dateToString(new Date()),
      notes: [],
    });
    const result = await log.save();
    return result;
  } catch (err) {
    throw err;
  }
};

const addLogNote = async (args, req) => {
  try {
    const userId = req.userId
    const { logId, note } = args.note;
    const creator = await User.findById(userId);
    const log = await Log.findById(logId);

    log.notes.push({
      note: note,
      editedAt: dateToString(new Date()),
      user: userId,
      username: creator.username,
    });

    const result = await log.save();
    return result;
  } catch (err) {
    throw err;
  }
};

const updateLogNote = async (args) => {
  try {
    const { logId, note, noteId } = args.note;

    const result = await Log.findOneAndUpdate(
      { _id: logId, "notes._id": noteId },
      { $set: { "notes.$.note": note } },
      { new: true }
    );

    throwErrorIfNull(result);

    return result;
  } catch (err) {
    throw err;
  }
};

const deleteLogNote = async (args) => {
  try {
    const { logId, noteId } = args.note;
    const result = await Log.findOneAndUpdate(
      { _id: logId },
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );

    throwErrorIfNull(result);

    return result;
  } catch (err) {
    throw err;
  }
};

const fetchLogs = async (args) => {
  try {
    const { offset, limit } = args;

    const filter = getPageFilter(limit, offset);

    const result = await Log.find({}, {}, filter);
    const groupLogs = await Log.aggregate([
      {
        $group: {
          _id: "$entityId",
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0 } }
    ])
    const totalLogs = groupLogs.length;

    const response = { Logs: result, totalLogs };

    return response;
  } catch (err) {
    console.log("Error while fetching logs", err);
  }
};

module.exports = {
  createLog: createLog,
  addLogNote: addLogNote,
  updateLogNote: updateLogNote,
  deleteLogNote: deleteLogNote,
  fetchLogs: fetchLogs,
};
