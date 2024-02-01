import EmployeeSearch from "./EmployeeSearch";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeCreateOrUpdate from "./EmployeeCreateOrUpdate";
import { useAtom } from "jotai";
import { employeesState, query } from "../store";
import { employeeInitialState } from "../utils/Constant";

const AddSearchAndFilter = () => {
  const [variables] = useAtom(query);
  const [employees] = useAtom(employeesState);
  return (
    <section className="flex justify-between my-4 flex-col md:flex-row gap-4 md:gap-0">
      {" "}
      {employees.data.length !== 0 ||
      variables.query !== "" ||
      variables.departmentFilter !== "" ||
      variables.employeeTypeFilter !== "" ||
      variables.titleFilter !== "" ? (
        <div className="flex gap-2 items-center w-full">
          <EmployeeSearch />
          <EmployeeFilter />
        </div>
      ) : (
        <div></div>
      )}
      <EmployeeCreateOrUpdate employeeInitialState={employeeInitialState} />
    </section>
  );
};

export default AddSearchAndFilter;
