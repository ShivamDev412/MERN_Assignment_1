import { useMutation, useApolloClient } from "@apollo/client";
import { GET_EMPLOYEES } from "./queries";
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "./mutations";
import { Employee } from "../Types/Employee";
import { employeeInitialState } from "../utils/Constant";
import { useAtom } from "jotai";
import { query } from "../store";

export const useAddEmployee = () => {
  const [variables] = useAtom(query);
  const [addEmployee] = useMutation(CREATE_EMPLOYEE, {
    variables: employeeInitialState,
    update(cache, { data: { addEmployee } }) {
      try {
        const { employees } = cache.readQuery<{
          employees?: { data: Employee[] };
        }>({
          query: GET_EMPLOYEES,
          variables,
        }) || { employees: { data: [] } };

        cache.writeQuery({
          query: GET_EMPLOYEES,
          data: { employees: { data: employees?.data.concat([addEmployee]) } },
          variables,
        });
      } catch (error) {
        console.error("Error updating cache:", error);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
  });

  return {
    addEmployee,
  };
};

export const useEditEmployee = () => {
  const [variables] = useAtom(query);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: employeeInitialState,
    update(cache, { data: { updateEmployee } }) {
      try {
        const { employees } = cache.readQuery<{
          employees?: { data: Employee[] };
        }>({
          query: GET_EMPLOYEES,
          variables,
        }) || { employees: { data: [] } };

        cache.writeQuery({
          query: GET_EMPLOYEES,
          data: {
            employees: {
              data: employees?.data.map((employee) =>
                employee.id === updateEmployee.id ? updateEmployee : employee
              ),
            },
          },
          variables,
        });
      } catch (error) {
        console.error("Error updating cache:", error);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
  });

  return {
    updateEmployee,
  };
};

export const useDeleteEmployee = (id: string | undefined) => {
  const apolloClient = useApolloClient();
  const [variables] = useAtom(query);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: String(id) },
    refetchQueries: [{ query: GET_EMPLOYEES, variables }],
    onCompleted() {
      apolloClient.resetStore();
    },
  });

  return {
    deleteEmployee,
  };
};
// export const useDeleteEmployee = (id: string | undefined) => {
//   const [variables] = useAtom(query);
//   const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
//     variables: { id: String(id) },
//     update(cache, { data: { deleteEmployee: deletedEmployee } }) {
//       const currentCache = cache.readQuery<{
//         employees?: { data: Employee[]; total: number };
//       }>({
//         query: GET_EMPLOYEES,
//         variables,
//       }) || { employees: { data: [], total: 0 } };

//       const { employees } = currentCache;

//       if (employees && employees.data) {
//         const updatedData = {
//           employees: {
//             data: employees.data.filter(
//               (employee: Employee) => employee.id !== deletedEmployee.id
//             ),
//             total: employees.total - 1,
//           },
//         };
//         cache.writeQuery({
//           query: GET_EMPLOYEES,
//           data: updatedData,
//           variables,
//         });
//       }
//     },
//   });

//   return {
//     deleteEmployee,
//   };
// };
