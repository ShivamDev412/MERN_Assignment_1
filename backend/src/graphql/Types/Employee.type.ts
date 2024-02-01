import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => {
    return {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      age: { type: GraphQLString },
      email: { type: GraphQLString },
      dateOfJoining: { type: GraphQLString },
      title: { type: GraphQLString },
      department: { type: GraphQLString },
      employeeType: { type: GraphQLString },
      currentStatus: { type: GraphQLInt },
    };
  },
});
