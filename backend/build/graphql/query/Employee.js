"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employee = exports.employees = void 0;
const graphql_1 = require("graphql");
const Employee_type_1 = require("../Types/Employee.type");
const Employee_schema_1 = __importDefault(require("../../Model/Employee.schema"));
const employees = {
    type: new graphql_1.GraphQLObjectType({
        name: 'EmployeePagination',
        fields: () => ({
            total: { type: graphql_1.GraphQLInt },
            data: { type: new graphql_1.GraphQLList(Employee_type_1.EmployeeType) },
        }),
    }),
    args: {
        query: { type: graphql_1.GraphQLString },
        limit: { type: graphql_1.GraphQLInt, defaultValue: 10 },
        page: { type: graphql_1.GraphQLInt, defaultValue: 1 },
        sort: { type: graphql_1.GraphQLString, defaultValue: "createdAt" },
        sortOrder: { type: graphql_1.GraphQLString, defaultValue: "-1" },
        titleFilter: { type: graphql_1.GraphQLString, defaultValue: "" },
        departmentFilter: { type: graphql_1.GraphQLString, defaultValue: "" },
        employeeTypeFilter: { type: graphql_1.GraphQLString, defaultValue: "" },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedSortFields = ["createdAt", "firstName", "lastName", "dateOfJoining"];
            if (!allowedSortFields.includes(args.sort)) {
                throw new Error(`Invalid sort field. Allowed values are: ${allowedSortFields.join(", ")}`);
            }
            try {
                const queryConditions = {};
                if (args.query !== "") {
                    const spaceIndex = args.query.indexOf(" ");
                    if (spaceIndex !== -1) {
                        queryConditions.$or = [
                            { firstName: new RegExp(args.query.substring(0, spaceIndex), "i") },
                            { lastName: new RegExp(args.query.substring(spaceIndex + 1), "i") },
                            { email: new RegExp(args.query, "i") },
                        ];
                    }
                    else {
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
                const totalCount = yield Employee_schema_1.default.countDocuments(queryConditions);
                // Perform the paginated query
                const skip = (args.page - 1) * args.limit;
                const query = Employee_schema_1.default.find(queryConditions)
                    .sort({ [args.sort]: args.sortOrder === "-1" ? -1 : 1 })
                    .skip(skip)
                    .limit(args.limit);
                const data = yield query.exec();
                return { total: totalCount, data };
            }
            catch (error) {
                console.error("Error searching employees:", error);
                throw new Error("Error searching employees");
            }
        });
    },
};
exports.employees = employees;
const employee = {
    type: Employee_type_1.EmployeeType,
    args: { id: { type: graphql_1.GraphQLID } },
    resolve: (parent, args) => {
        try {
            return Employee_schema_1.default.findById(args.id);
        }
        catch (error) {
            return error;
        }
    },
};
exports.employee = employee;
