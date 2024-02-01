"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeType = void 0;
const graphql_1 = require("graphql");
exports.EmployeeType = new graphql_1.GraphQLObjectType({
    name: "Employee",
    fields: () => {
        return {
            id: { type: graphql_1.GraphQLID },
            firstName: { type: graphql_1.GraphQLString },
            lastName: { type: graphql_1.GraphQLString },
            age: { type: graphql_1.GraphQLInt },
            email: { type: graphql_1.GraphQLString },
            dateOfJoining: { type: graphql_1.GraphQLString },
            title: { type: graphql_1.GraphQLString },
            department: { type: graphql_1.GraphQLString },
            employeeType: { type: graphql_1.GraphQLString },
            currentStatus: { type: graphql_1.GraphQLInt },
        };
    },
});
