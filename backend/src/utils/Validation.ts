import { z } from "zod";

const isNonEmpty = (value: string) => value.trim().length > 0;
const containsOnlyLetters = (value: string) => /^[a-zA-Z]+$/.test(value);

export const employeeValidationSchema = z.object({
  firstName: z
    .string()
    .refine(isNonEmpty, { message: "First name cannot be empty." })
    .refine(containsOnlyLetters, {
      message: "First name must only contain letters.",
    }),

  lastName: z
    .string()
    .refine(isNonEmpty, { message: "Last name cannot be empty." })
    .refine(containsOnlyLetters, {
      message: "Last name must only contain letters.",
    }),

  age: z
    .string()
    .refine(
      (value: { toString: () => string }) => {
        const stringValue = value.toString().trim();
        return stringValue.length > 0;
      },
      {
        message: "Age cannot be empty.",
      }
    )
    .refine((value: string | number) => +value >= 20 && +value <= 70, {
      message: "Age must be between 20 and 70.",
    }),

  dateOfJoining: z.string().min(1, "Date of joining is required"),
  email: z.string().email("Invalid email address"),
  title: z.string().refine(isNonEmpty, { message: "Title cannot be empty." }),
  department: z.string().refine(isNonEmpty, {
    message: "Department cannot be empty.",
  }),
  employeeType: z.string().refine(isNonEmpty, {
    message: "Employee type cannot be empty.",
  }),
});

export default employeeValidationSchema;
