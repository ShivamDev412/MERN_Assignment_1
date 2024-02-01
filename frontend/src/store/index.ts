
import { atom } from "jotai";

export const query = atom({
  query: "",
  page: 1,
  limit: 10,
  sort: "createdAt",
  sortOrder: "-1",
  titleFilter: "",
  departmentFilter: "",
  employeeTypeFilter: "",
});
export const employeesState = atom({
  data: [],
  total: 0,
})