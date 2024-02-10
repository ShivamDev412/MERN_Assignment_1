import mongoose, { Schema, Document } from "mongoose";

type Title = "Employee" | "Manager" | "Director" | "VP";
type Department = "IT" | "Marketing" | "HR" | "Engineering";
type EmployeeType = "FullTime" | "PartTime" | "Seasonal" | "Contract";

export interface EmployeeT extends Document {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  dateOfJoining: Date;
  title: Title;
  department: Department;
  employeeType: EmployeeType;
  currentStatus: number;
}

const EmployeeSchema = new Schema<EmployeeT>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    employeeType: {
      type: String,
      required: [true, "Employee type is required"],
    },
    currentStatus: {
      type: Number,
      required: [true, "Current status is required"],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<EmployeeT>("Employee", EmployeeSchema);

export default Employee;
