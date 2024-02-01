import { FC, useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { dateFormatter } from "../utils/DateFormatter";
import { Employee } from "../Types/Employee";
import EmployeeDataAction from "./EmployeeDataAction";

interface EmployeeDataProps {
  employee: Employee;
}
const EmployeeData: FC<EmployeeDataProps> = ({ employee }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    () => {
      setShowDropdown(false);
    }
  },[])
  return (
    <TableRow key={employee?.id}>
      <TableCell className="text-center">{employee?.firstName} {employee?.lastName}</TableCell>
      <TableCell className="text-center">{employee?.email}</TableCell>
      <TableCell className="text-center">{employee?.age}</TableCell>
      <TableCell className="text-center">
        {dateFormatter(employee?.dateOfJoining)}
      </TableCell>
      <TableCell className="text-center">{employee?.title}</TableCell>
      <TableCell className="text-center">{employee?.department}</TableCell>
      <TableCell className="text-center">{employee?.employeeType}</TableCell>
      <TableCell className="text-center">{employee?.currentStatus}</TableCell>
      <TableCell className="flex justify-center">
       <EmployeeDataAction data={employee} showDropdown={showDropdown} setShowDropdown={setShowDropdown}/>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeData;
