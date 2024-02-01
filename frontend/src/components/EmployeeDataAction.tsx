import { MdOutlineMoreVert } from "react-icons/md";
import { FC, useState } from "react";

import { Popover } from "react-tiny-popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Employee, EmployeeDeleteProps } from "../Types/Employee";
import EmployeeCreateOrUpdate from "./EmployeeCreateOrUpdate";
import { dateFormatter } from "../utils/DateFormatter";
import { useDeleteEmployee } from "../graphql/useMutations";
import { useAtom } from "jotai";
import { employeesState, query } from "../store";

const EmployeeDeleteAction: FC<EmployeeDeleteProps> = ({
  setShowModal,
  showModal,
  data,
  setShowDropdown,
}) => {
  const [employees] = useAtom(employeesState);
  const [, setVariables] = useAtom(query);
  const { deleteEmployee } = useDeleteEmployee(data?.id);

  const handleDelete = () => {
    // setEmployees((prevEmployees) => ({
    //   ...prevEmployees,
    //   total: prevEmployees.total - 1,
    // }));
    if (employees.data.length === 1 && (employees.total - 1) % 10 === 0) {
      setVariables((prevVariables) => ({
        ...prevVariables,
        page: prevVariables.page - 1,
      }));
    } else if (employees.total > 1 && employees.total <= 10) {
      setVariables((prevVariables) => ({
        ...prevVariables,
        page: 1,
      }));
    }
    deleteEmployee();
    setShowModal(false);
    setShowDropdown(false);
  };
  return (
    <AlertDialog open={showModal}>
      <AlertDialogTrigger
        asChild
        onClick={() => {
          setShowModal(true);
        }}
      >
        <Button variant={"ghost"} className="w-full flex justify-start">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Employee</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this employee?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setShowDropdown(false);
              setShowModal(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const EmployeeDataAction: FC<{
  data: Employee;
  showDropdown: boolean;
  setShowDropdown: any;
}> = ({ data, showDropdown, setShowDropdown }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Popover
      isOpen={showDropdown}
      // onClickOutside={() => setShowDropdown(false)}
      positions={["bottom"]}
      content={
        <div className="p-2 rounded-lg bg-white dark:bg-[#020817] shadow-lg dark:border dark:border-gray-800 w-[1.2in]">
          {" "}
          <EmployeeCreateOrUpdate
            formTitle="Edit"
            setShowDropdown={setShowDropdown}
            employeeInitialState={{
              ...data,
              dateOfJoining: dateFormatter(data.dateOfJoining),
              age: data.age.toString(),
            }}
          />
          <EmployeeDeleteAction
            setShowDropdown={setShowDropdown}
            showModal={showModal}
            setShowModal={setShowModal}
            data={data}
          />
        </div>
      }
    >
      <div>
        <MdOutlineMoreVert
          onClick={() => setShowDropdown(!showDropdown)}
          className="hover:cursor-pointer"
        />
      </div>
    </Popover>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <button
    //       className="outline-none border-0"
    //       onClick={() => setShowDropdown(true)}
    //     >
    //       <MdOutlineMoreVert />
    //     </button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <EmployeeCreateOrUpdate
    //       formTitle="Edit"
    //       setShowDropdown={setShowDropdown}
    //       employeeInitialState={{
    //         ...data,
    //         dateOfJoining: dateFormatter(data.dateOfJoining),
    //       }}
    //     />
    //     <EmployeeDeleteAction
    //       setShowDropdown={setShowDropdown}
    //       showModal={showModal}
    //       setShowModal={setShowModal}
    //       data={data}
    //     />
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default EmployeeDataAction;
