import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { EmployeeType } from "../Types/Employee.type";
import Employee from "../../Model/Employee.schema";
const employees = {
  type: new GraphQLObjectType({
    name: 'EmployeePagination',
    fields: () => ({
      total: { type: GraphQLInt },
      data: { type: new GraphQLList(EmployeeType) },
    }),
  }),
  args: {
    query: { type: GraphQLString },
    limit: { type: GraphQLInt, defaultValue: 10 },
    page: { type: GraphQLInt, defaultValue: 1 },
    sort: { type: GraphQLString, defaultValue: "createdAt" },
    sortOrder: { type: GraphQLString, defaultValue: "-1" },
    titleFilter: { type: GraphQLString, defaultValue: "" },
    departmentFilter: { type: GraphQLString, defaultValue: "" },
    employeeTypeFilter: { type: GraphQLString, defaultValue: "" },
  },
  async resolve(
    parent: any,
    args: {
      query: string;
      limit: number;
      page: number;
      sort: string;
      sortOrder: string;
      titleFilter: string;
      departmentFilter: string;
      employeeTypeFilter: string;
    }
  ) {
    const allowedSortFields = ["createdAt", "firstName", "lastName", "dateOfJoining"];

    if (!allowedSortFields.includes(args.sort)) {
      throw new Error(
        `Invalid sort field. Allowed values are: ${allowedSortFields.join(", ")}`
      );
    }

    try {
      const queryConditions: any = {};

      if (args.query !== "") {
        const spaceIndex = args.query.indexOf(" ");

        if (spaceIndex !== -1) {
          queryConditions.$or = [
            { firstName: new RegExp(args.query.substring(0, spaceIndex), "i") },
            { lastName: new RegExp(args.query.substring(spaceIndex + 1), "i") },
            { email: new RegExp(args.query, "i") }, 
          ];
        } else {
          queryConditions.$or = [
            { firstName: new RegExp(args.query, "i") },
            { lastName: new RegExp(args.query, "i") },
            { email: new RegExp(args.query, "i") },
          ];
        }
      }

      if (args.titleFilter !== "") {
        queryConditions.title = new RegExp(args.titleFilter, "i");
      }

      if (args.departmentFilter !== "") {
        queryConditions.department = new RegExp(args.departmentFilter, "i");
      }

      if (args.employeeTypeFilter !== "") {
        queryConditions.employeeType = new RegExp(args.employeeTypeFilter, "i");
      }

      // Query for the total count
      const totalCount = await Employee.countDocuments(queryConditions);

      // Perform the paginated query
      const skip = (args.page - 1) * args.limit;
      const query = Employee.find(queryConditions)
        .sort({ [args.sort]: args.sortOrder === "-1" ? -1 : 1 })
        .skip(skip)
        .limit(args.limit);

      const data = await query.exec();

      return { total: totalCount, data };
    } catch (error) {
      console.error("Error searching employees:", error);
      throw new Error("Error searching employees");
    }
  },
};


const employee = {
  type: EmployeeType,
  args: { id: { type: GraphQLID } },
  resolve: (parent: any, args: { id: any }) => {
    try {
      return Employee.findById(args.id);
    } catch (error) {
      return error;
    }
  },
};
export { employees, employee };
