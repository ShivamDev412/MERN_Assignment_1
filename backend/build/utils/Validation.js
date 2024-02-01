"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeValidationSchema = void 0;
const zod_1 = require("zod");
const isNonEmpty = (value) => value.trim().length > 0;
const containsOnlyLetters = (value) => /^[a-zA-Z]+$/.test(value);
exports.employeeValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .refine(isNonEmpty, { message: "First name cannot be empty." })
        .refine(containsOnlyLetters, {
        message: "First name must only contain letters.",
    }),
    lastName: zod_1.z
        .string()
        .refine(isNonEmpty, { message: "Last name cannot be empty." })
        .refine(containsOnlyLetters, {
        message: "Last name must only contain letters.",
    }),
    age: zod_1.z
        .string()
        .refine((value) => {
        const stringValue = value.toString().trim();
        return stringValue.length > 0;
    }, {
        message: "Age cannot be empty.",
    })
        .refine((value) => +value >= 20 && +value <= 70, {
        message: "Age must be between 20 and 70.",
    }),
    dateOfJoining: zod_1.z.string().min(1, "Date of joining is required"),
    email: zod_1.z.string().email("Invalid email address"),
    title: zod_1.z.string().refine(isNonEmpty, { message: "Title cannot be empty." }),
    department: zod_1.z.string().refine(isNonEmpty, {
        message: "Department cannot be empty.",
    }),
    employeeType: zod_1.z.string().refine(isNonEmpty, {
        message: "Employee type cannot be empty.",
    }),
});
exports.default = exports.employeeValidationSchema;
