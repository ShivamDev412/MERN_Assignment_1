import { CiFilter } from "react-icons/ci";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { DepartmentData, EmployeeTypeData, TitleData } from "../utils/Constant";
import InputSelect from "./InputSelect";
import { useAtom } from "jotai";
import { query } from "../store";

const EmployeeFilter = () => {
  const [variables, setVariables] = useAtom(query);
  const { register, handleSubmit, reset } = useForm<any>({
    defaultValues: {
      title: "",
      department: "",
      employeeType: "",
    },
  });
  const handleCloseModal = () => {
    reset();
    setVariables({
      ...variables,
      titleFilter: "",
      departmentFilter: "",
      employeeTypeFilter: "",
    });
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    const { title, department, employeeType } = data;
    setVariables({
      ...variables,
      titleFilter: title,
      departmentFilter: department,
      employeeTypeFilter: employeeType,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-700 flex gap-2">
          <CiFilter className="fill-white text-lg items-center" />
          <p className="font-semibold text-white">Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[2.5in]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] mx-auto">
          <InputSelect
            label={"Title"}
            data={TitleData}
            register={register}
            errors={{}}
            id={"title"}
          />
          <InputSelect
            label={"Employee Type"}
            data={EmployeeTypeData}
            register={register}
            errors={{}}
            id={"employeeType"}
          />
          <InputSelect
            label={"Department"}
            data={DepartmentData}
            register={register}
            errors={{}}
            id={"department"}
          />
          <div className="flex gap-2 w-full mt-10">
            <DropdownMenuItem className="w-1/2">
              <Button
                className="bg-red-800 w-full text-white font-semibold"
                onClick={handleCloseModal}
                type="button"
              >
                Reset
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-1/2">
              <Button
                className="bg-green-700 w-full text-white font-semibold"
                type="submit"
              >
                Apply
              </Button>
            </DropdownMenuItem>
          </div>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmployeeFilter;
