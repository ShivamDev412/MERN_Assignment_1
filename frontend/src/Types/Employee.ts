export type Employee = {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  dateOfJoining: string;
  title: string;
  department: string;
  employeeType: string;
  currentStatus: number | string;
};
export type EmployeeDeleteProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  data: Employee;
}
export type EmployeeCreateProps = {
  employeeInitialState: Employee;
  formTitle?:string;
  setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}