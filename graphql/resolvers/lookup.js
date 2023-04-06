/** @format */

const {
  UPDATE_PERMISSION,
  CD_PERMISSION,
} = require("../../constants/constants");
const { ACTION, ROLE } = require("../../constants/enum");
const {
  SUCCESSFUL_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
} = require("../../constants/response");
const { dateToString } = require("../../helpers/date");
const {
  throwErrorIfNull,
  throwPermissionError,
  getPageFilter,
} = require("../../helpers/utils");
const { Lookup, LookupValue, LookupRelation } = require("../../models/lookup");

const createLookup = async (args, req) => {
  const { userId, companyId, role } = req;

  throwPermissionError(CD_PERMISSION, role);

  const { input } = args;
  const { name, isActive, tags, description } = input;

  const lookup = new Lookup({
    name,
    isActive,
    tags: tags || [],
    description: description || "",
    action: ACTION.Add,
    company: companyId,
    canDuplicate: true,
    canView: true,
    createdBy: userId,
    createdAt: dateToString(new Date()),
    editedBy: userId,
    lastEdited: dateToString(new Date()),
    permission: [
      {
        user: userId,
        access: ROLE.Owner,
      },
    ],
  });
  const result = await lookup.save();
  return result;
};

const updateLookup = async (args, req) => {
  const { userId } = req;
  const { input } = args;
  const { id } = input;
  const params = {
    ...input,
    editedBy: userId,
    lastEdited: dateToString(new Date()),
  };
  delete params.id;

  const lookup = await Lookup.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...params },
    },
    { new: true }
  )
    .where("permission.user")
    .equals(userId)
    .where("permission.access")
    .in(UPDATE_PERMISSION);

  throwErrorIfNull(lookup, null, "Access Restricted");
  return lookup;
};

const deleteLookup = async (args, req) => {
  const { userId } = req;

  console.log(userId);
  const { id } = args;

  const lookup = await Lookup.updateMany(
    { _id: { $in: [...id] } },
    {
      $set: { isActive: false },
    }
  )
    .where("permission.user")
    .equals(userId)
    .where("permission.access")
    .in(CD_PERMISSION);
  throwErrorIfNull(lookup, "modifiedCount");
  return { ...SUCCESSFUL_RESPONSE };
};

const createLookupValue = async (args, req) => {
  const { userId, companyId, role } = req;

  const { input } = args;
  const { name, isActive, icon, lookupId } = input;

  const lookupValue = new LookupValue({
    name,
    isActive,
    icon: icon || "",
    company: companyId,
    lookupId,
    createdBy: userId,
    createdAt: dateToString(new Date()),
    editedBy: userId,
    lastEdited: dateToString(new Date()),
  });
  const result = await lookupValue.save();
  return result;
};

const createLookupValues = async (args, req) => {
  const { userId, companyId, role } = req;

  const { input } = args;

  const lookupValuesToCreate = [...input];

  const lookupValues = lookupValuesToCreate.map(
    ({ name, isActive, icon, lookupId }, index) => {
      return {
        name,
        isActive,
        icon: icon || "",
        lookupId,
        order: index,
        company: companyId,
        createdBy: userId,
        createdAt: dateToString(new Date()),
        editedBy: userId,
        lastEdited: dateToString(new Date()),
      };
    }
  );
  let result = await LookupValue.insertMany(lookupValues);
  return result;
};

const updateLookupValue = async (args, req) => {
  const { userId, role } = req;

  throwPermissionError(UPDATE_PERMISSION, role);

  const { input } = args;
  const { id } = input;
  const params = {
    ...input,
    editedBy: userId,
    lastEdited: dateToString(new Date()),
  };
  delete params.id;

  const lookupValue = await LookupValue.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...params },
    },
    { new: true }
  );
  return lookupValue;
};

const updateLookupValues = async (args, req) => {
  try {
    const { role } = req;

    throwPermissionError(UPDATE_PERMISSION, role);

    const { input } = args;
    const lookupValues = [...input];
    const updateLookupValuePromises = lookupValues.map((lookupValue) => {
      return updateLookupValue({
        input: { ...lookupValue },
        req,
      });
    });

    await Promise.all(updateLookupValuePromises);

    return { ...SUCCESSFUL_RESPONSE };
  } catch (err) {
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

const deleteLookupValue = async (args, req) => {
  const { userId, role } = req;

  throwPermissionError(CD_PERMISSION, role);

  const { id } = args;
  const lookupValue = await LookupValue.deleteMany({ _id: { $in: [...id] } })
    .where("createdBy")
    .equals(userId);

  throwErrorIfNull(lookupValue, "deletedCount");
  return { ...SUCCESSFUL_RESPONSE };
};

const createRelationship = async (args) => {
  try {
    const { input } = args;
    const relations = [...input];
    const idsToDelete = relations.filter(
      (relation) => relation.status === ACTION.Delete
    );
    if (idsToDelete.length > 0)
      await deleteRelationship({ id: [...idsToDelete] });

    const relationToCreate = relations.filter(
      (relation) => relation.status === ACTION.Add
    );

    const relationToCreateExcludeStatus = relationToCreate.map((relation) => {
      const obj = { ...relation, createdAt: dateToString(new Date()) };
      delete obj.status;
      return obj;
    });

    await LookupRelation.insertMany(relationToCreateExcludeStatus);

    return { ...SUCCESSFUL_RESPONSE };
  } catch (err) {
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

const deleteRelationship = async (args) => {
  // Not an API
  try {
    const { id } = args;

    await LookupRelation.deleteMany({ _id: { $in: [...id] } });
    return { ...SUCCESSFUL_RESPONSE };
  } catch (err) {
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

const fetchLookup = async (args, req) => {
  try {
    const { userId, companyId } = req;

    const { offset, limit } = args;
    const filter = getPageFilter(limit, offset);
    const result = await Lookup.find(
      {
        /*company: companyId*/
      },
      {}, // add company Id filter - company: companyId and create company id index
      filter
    )
      .where("permission.user")
      .equals(userId)
      .populate("permission.user")
      .populate("editedBy");

    return result;
  } catch (err) {
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

const fetchLookupValue = async (args) => {
  try {
    const { id } = args;
    const result = await LookupValue.find({ lookupId: id }); // Create Lookup Id Index

    return result;
  } catch (err) {
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

const fetchLookupRelationship = async (args) => {
  try {
    const { id } = args;
    const result = await LookupRelation.find({
      $or: [{ lookup: id }, { childLookup: id }],
    }) // create lookup & childLookup index
      .populate("lookup")
      .populate("lookupValue")
      .populate("childLookup")
      .populate("childLookupValue");
    return result;
  } catch (err) {
    console.log(err);
    return { ...INTERNAL_SERVER_ERROR_RESPONSE };
  }
};

module.exports = {
  createLookup,
  updateLookup,
  deleteLookup,
  createLookupValue,
  createLookupValues,
  updateLookupValue,
  updateLookupValues,
  deleteLookupValue,
  createRelationship,
  fetchLookup,
  fetchLookupValue,
  fetchLookupRelationship,
};
