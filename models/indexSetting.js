/** @format */

const mongoose = require("mongoose");
const { ROW_ACTION } = require("../constants/enum");

const Schema = mongoose.Schema;

const indexSchema = new Schema({
  title: String,
  columns: [
    {
      name: String,
      defaultLabel: String,
      label: String,
      hidden: Boolean,
      maxWidth: String,
    },
  ],
  rowAction: [
    {
      single: Boolean,
      group: Boolean,
      action: {
        type: String,
        enum: Object.values(ROW_ACTION),
        default: ROW_ACTION.Delete,
      },
    }
  ],
  permissions: {
    logged: Boolean,
    users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  createdDate: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("indexSetting", indexSchema);
