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
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    employeeType: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<EmployeeT>("Employee", EmployeeSchema);

export default Employee;
