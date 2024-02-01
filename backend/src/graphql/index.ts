import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { employees, employee } from "./query/Employee";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "./mutations/Employee";
const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    employee,
    employees,
  },
});
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addEmployee,
    updateEmployee,
    deleteEmployee,
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});
export default schema;
