import { useQuery } from "@apollo/client";
import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import { GET_EMPLOYEES } from "./graphql/queries";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { employeesState, query } from "./store";
import TableSkeleton from "./components/Skeleton";
import AddSearchAndFilter from "./components/AddSearchAndFilter";

function EmployeeDirectory() {
  const [variables] = useAtom(query);
  const [, setEmployees] = useAtom(employeesState);
  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables,
    // fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (data && data?.employees) {
      setEmployees(data.employees);
    }
  }, [data, variables]);
  if (error) return <p>Error : {error?.message}</p>;
  return (
    <div className="h-screen w-screen flex flex-col justify-between overflow-x-hidden">
      <Header />
      <main className="w-[90%] 2xl:w-[80%] mx-auto flex-1 my-4">
        <AddSearchAndFilter />
        {loading ? <TableSkeleton /> : <EmployeeTable />}
      </main>
    </div>
  );
}

export default EmployeeDirectory;
