import { memo, useState } from "react";
import { FaSort } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useAtom } from "jotai";
import { employeesState, query } from "../store";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import NoData from "./NoData";
import EmployeeData from "./EmployeeData";
import { Button } from "./ui/button";
import Pagination from "./Pagination";

const EmployeeTable = memo(() => {
  const [variables, setVariables] = useAtom(query);
  const [employees] = useAtom(employeesState);
  const [sortOder, setSortOrder] = useState<string>(variables.sortOrder);
  const handleSort = (sortBy: string) => {
    const sort = sortOder === "-1" ? "1" : "-1";
    setVariables({
      ...variables,
      sort: sortBy,
      sortOrder: sort,
    });
    setSortOrder(sort);
  };
  return (
    <>
      {employees?.data?.length === 0 ? (
        <NoData title="Employees" />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center flex justify-center gap-2 items-center">
                  Name{" "}
                  <FaSort
                    className="hover:cursor-pointer hover:fill-white"
                    onClick={() => handleSort("firstName")}
                  />
                </TableHead>
                <TableHead className="text-center ">Email</TableHead>
                <TableHead className="text-center">Age </TableHead>
                <TableHead className="text-center flex justify-center gap-2 items-center">
                  Date Of Joining{" "}
                  <FaSort
                    className="hover:cursor-pointer hover:fill-white"
                    onClick={() => handleSort("dateOfJoining")}
                  />
                </TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Department</TableHead>
                <TableHead className="text-center">Employee Type</TableHead>
                <TableHead className="text-center flex justify-center gap-2 items-center">
                  Current Status{" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="p-0">
                          {" "}
                          <IoMdInformationCircleOutline className="hover:cursor-pointer" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Current Status 1 is for working. 2 is for serving
                          notice period{" "}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.data?.map((employee: any) => (
                <EmployeeData employee={employee} key={employee.id} />
              ))}
            </TableBody>
          </Table>
          <Pagination />
        </>
      )}
    </>
  );
});

export default EmployeeTable;
