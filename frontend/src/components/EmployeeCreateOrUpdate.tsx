import { useForm, SubmitHandler } from "react-hook-form";
import React, { FC, useState } from "react";
import { MutationFunction } from "@apollo/client";
import { IoIosAdd } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { EmployeeCreateProps } from "../Types/Employee";
import InputField from "./InputField";
import { DepartmentData, EmployeeTypeData, TitleData } from "../utils/Constant";
import InputSelect from "./InputSelect";
import { useAddEmployee, useEditEmployee } from "../graphql/useMutations";
import { employeeValidationSchema } from "../utils/Validation";
import { z } from "zod";
export const EmployeeCreateOrUpdate: FC<EmployeeCreateProps> = ({
  employeeInitialState,
  formTitle = "Add",
  setShowDropdown = () => null,
}) => {
  type FormField = z.infer<typeof employeeValidationSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormField>({
    defaultValues: employeeInitialState,
    resolver: zodResolver(employeeValidationSchema),
  });

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    clearErrors();
    reset({
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      email: "",
      employeeType: "",
      // currentStatus: "",
      title: "",
      department: "",
    });
    setShowDropdown(false);
  };
  const { addEmployee } = useAddEmployee();
  const { updateEmployee } = useEditEmployee();
  const handleEmployee = async (
    data: FormField,
    callback: MutationFunction
  ) => {
    try {
      const {
        firstName,
        lastName,
        email,
        dateOfJoining,
        title,
        age,
        department,
        employeeType,
      } = data;
      await callback({
        variables: {
          id: employeeInitialState.id,
          firstName,
          lastName,
          email,
          dateOfJoining,
          title,
          age,
          department,
          employeeType,
          currentStatus: employeeInitialState.currentStatus,
        },
      });

      handleCloseModal();
    } catch (error: any) {
      console.error("Mutation error:", error.message);
    }
  };
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    handleEmployee(data, formTitle === "Add" ? addEmployee : updateEmployee);
  };

  return (
    <AlertDialog open={openModal}>
      <AlertDialogTrigger asChild onClick={() => setOpenModal(true)}>
        {formTitle === "Add" ? (
          <Button className="bg-green-700 flex gap-1 items-center">
            <IoIosAdd className="text-xl fill-white" />
            <p className="font-semibold text-white">Add New Employee</p>
          </Button>
        ) : (
          <Button variant={"ghost"} className="w-full flex justify-start">
            Edit
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] overflow-auto">
        <AlertDialogTitle className="text-center text-2xl">
          {formTitle} Employee
        </AlertDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="firstName"
            labelText="First Name"
            register={register}
            errors={errors}
            type="text"
          />
          <InputField
            id="lastName"
            labelText="Last Name"
            register={register}
            errors={errors}
            type="text"
          />
          <InputField
            id="email"
            labelText="Email"
            register={register}
            errors={errors}
            type="email"
          />
          <InputField
            id="age"
            labelText="Age"
            register={register}
            errors={errors}
            type="string"
          />
          <InputField
            id="dateOfJoining"
            labelText="Date of Joining"
            register={register}
            errors={errors}
            type="date"
          />
          <InputSelect
            label={"Title"}
            data={TitleData}
            register={register}
            errors={errors}
            id={"title"}
          />
          <InputSelect
            label={"Employee Type"}
            data={EmployeeTypeData}
            register={register}
            errors={errors}
            id={"employeeType"}
          />
          <InputSelect
            label={"Department"}
            data={DepartmentData}
            register={register}
            errors={errors}
            id={"department"}
          />
          <div className="flex gap-2 w-full mt-10">
            <Button
              className="bg-red-800 w-1/2 text-white font-semibold"
              onClick={handleCloseModal}
              type="button"
            >
              Cancel
            </Button>

            <Button
              className="bg-green-700 w-1/2 text-white font-semibold disabled:cursor-not-allowed"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default React.memo(EmployeeCreateOrUpdate);
