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
exports.updateEmployee = exports.deleteEmployee = exports.addEmployee = void 0;
const graphql_1 = require("graphql");
const Employee_type_1 = require("../Types/Employee.type");
const Employee_schema_1 = __importDefault(require("../../Model/Employee.schema"));
const Validation_1 = __importDefault(require("../../utils/Validation"));
exports.addEmployee = {
    type: Employee_type_1.EmployeeType,
    args: {
        firstName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        lastName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateOfJoining: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        department: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        employeeType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        currentStatus: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt), defaultValue: 1 },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            Validation_1.default.parse(args);
            const existingEmployee = yield Employee_schema_1.default.findOne({ email: args.email });
            if (existingEmployee) {
                return {
                    employee: null,
                    error: "Employee with this email already exists",
                };
            }
            const savedEmployee = yield Employee_schema_1.default.create(args);
            return savedEmployee;
        }
        catch (error) {
            console.log(error);
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return { employee: null, error: errorMessage };
        }
    }),
};
exports.deleteEmployee = {
    type: Employee_type_1.EmployeeType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedEmployee = yield Employee_schema_1.default.findByIdAndDelete(args.id);
            return deletedEmployee;
        }
        catch (error) {
            return { employee: null, error: error.message };
        }
    }),
};
exports.updateEmployee = {
    type: Employee_type_1.EmployeeType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        firstName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        lastName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dateOfJoining: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        department: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        employeeType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        currentStatus: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt), defaultValue: 1 },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedEmployee = yield Employee_schema_1.default.findByIdAndUpdate(args.id, args, {
                new: true,
            });
            return updatedEmployee;
        }
        catch (error) {
            return { employee: null, error: error.message };
        }
    }),
};
