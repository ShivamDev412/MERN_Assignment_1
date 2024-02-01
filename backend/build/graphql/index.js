"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Employee_1 = require("./query/Employee");
const Employee_2 = require("./mutations/Employee");
const query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        employee: Employee_1.employee,
        employees: Employee_1.employees,
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        addEmployee: Employee_2.addEmployee,
        updateEmployee: Employee_2.updateEmployee,
        deleteEmployee: Employee_2.deleteEmployee,
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query,
    mutation,
});
exports.default = schema;
