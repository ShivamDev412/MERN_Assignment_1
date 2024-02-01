export const employeeInitialState = {
  id: "",
  firstName: "",
  lastName: "",
  age: "",
  dateOfJoining: "",
  email: "",
  title: "",
  department: "",
  employeeType: "",
  currentStatus: 1,
};
export const TitleData = [
  {
    title: "Employee",
    value: "Employee",
  },
  {
    title: "Manager",
    value: "Manager",
  },
  {
    title: "Director",
    value: "Director",
  },
  {
    title: "VP",
    value: "VP",
  },
];
export const DepartmentData = [
  {
    title: "IT",
    value: "IT",
  },
  {
    title: "Marketing",
    value: "Marketing",
  },
  {
    title: "HR",
    value: "HR",
  },
  {
    title: "Engineering",
    value: "Engineering",
  },
];
export const EmployeeTypeData = [
  {
    title: "FullTime",
    value: "FullTime",
  },
  {
    title: "PartTime",
    value: "PartTime",
  },
  {
    title: "Seasonal",
    value: "Seasonal",
  },
  {
    title: "Contract",
    value: "Contract",
  },
];
export const employeesInitialState = {
  data: [],
  total:0
}