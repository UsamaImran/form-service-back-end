/** @format */

const { ROW_ACTION } = require("./enum");

const DEFAULT_COLUMNS = [
  { name: "Name", defaultLabel: "Name", label: "Name", hidden: false, maxWidth: "auto" },
  { name: "Menu", defaultLabel: "Menu", label: "Menu", hidden: false, maxWidth: "auto" },
  {
    name: "Sub Menu", defaultLabel: "Sub Menu", label: "Sub Menu", hidden: false, maxWidth: "auto"
  },
  {
    name: "Last Edited",
    defaultLabel: "Last Edited",
    label: "Last Edited",
    hidden: false,
    maxWidth: "auto",
  },
  { name: "Edited By", defaultLabel: "Edited By", label: "Edited By", hidden: false, maxWidth: "auto" },
  { name: "Tags", defaultLabel: "Tags", label: "Tags", hidden: false, maxWidth: "auto" },
  { name: "Created By", defaultLabel: "Created By", label: "Created By", hidden: false, maxWidth: "auto" },
  {
    name: "Created Date",
    defaultLabel: "Created Date",
    label: "Created Date",
    hidden: false,
    maxWidth: "auto",
  },
];

const ROW_ACTIONS_DEFAULT = [
  {
    action: ROW_ACTION.Delete,
    single: true,
    group: false,
  },
  {
    action: ROW_ACTION.Duplicate,
    single: true,
    group: false,
  },
  {
    action: ROW_ACTION.Permission,
    single: true,
    group: true,
  },
  {
    action: ROW_ACTION.Tag,
    single: true,
    group: true,
  },
];

const PERMISSIONS_DEFAULT = {
  logged: false,
  users: ["Bilal"],
};
module.exports = { DEFAULT_COLUMNS, ROW_ACTIONS_DEFAULT, PERMISSIONS_DEFAULT };
