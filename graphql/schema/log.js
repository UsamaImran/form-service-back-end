/** @format */

const noteFragment = `
    id:ID!
    note: String!
    editedAt: String!
    username: String!
`;
const Log = `

    type Note {
        ${noteFragment}
    }
    type Log {
        id: ID!
        date: String!
        hour: String!
        userId:String!
        department:String
        entityId: String!
        entityName: String!
        user: User!
        action: String!
        setting: String
        path: String!
        subPath: String
        oldValue: String!
        newValue: String!
        createdAt:String!
        notes : [Note!]!
    }

    type LogData{
        Logs: [Log!]!
        totalLogs: Int!
    }

    input LogInput {
        action: String
        setting: String
        path: String
        subPath: String
        oldValue: String
        newValue: String
        note: String
    }

    input AddNote{
        logId: String!
        note: String!
    }

    input UpdateNote{
        logId: String!
        noteId: String!
        note: String!
    }

    input DeleteNote{
        logId: String!
        noteId: String!
    }
`;

module.exports = {
    Log,
};
