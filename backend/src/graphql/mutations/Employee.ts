import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { EmployeeType } from "../Types/Employee.type";
import Employee, { EmployeeT } from "../../Model/Employee.schema";
import employeeValidationSchema from "../../utils/Validation";

export const addEmployee = {
  type: EmployeeType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    dateOfJoining: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    employeeType: { type: new GraphQLNonNull(GraphQLString) },
    currentStatus: { type: new GraphQLNonNull(GraphQLInt), defaultValue: 1 },
  },
  resolve: async (_parent: any, args: EmployeeT) => {
    try {
      employeeValidationSchema.parse(args);
      const existingEmployee = await Employee.findOne({ email: args.email });
      if (existingEmployee) {
        return {
          employee: null,
          error: "Employee with this email already exists",
        };
      }
      const savedEmployee = await Employee.create(args);
      return savedEmployee;
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.errors.map((err: any) => err.message).join(", ");
      return { employee: null, error: errorMessage };
    }
  },
};

export const deleteEmployee = {
  type: EmployeeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: EmployeeT) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(args.id);
      return deletedEmployee;
    } catch (error: any) {
      return { employee: null, error: error.message };
    }
  },
};

export const updateEmployee = {
  type: EmployeeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    dateOfJoining: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    employeeType: { type: new GraphQLNonNull(GraphQLString) },
    currentStatus: { type: new GraphQLNonNull(GraphQLInt), defaultValue: 1 },
  },
  resolve: async (_parent: any, args: EmployeeT) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return updatedEmployee;
    } catch (error: any) {
      return { employee: null, error: error.message };
    }
  },
};
