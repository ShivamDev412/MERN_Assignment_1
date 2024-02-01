import { gql } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query GetEmployees(
    $query: String
    $limit: Int
    $page: Int
    $sort: String
    $sortOrder: String
    $titleFilter: String
    $departmentFilter: String
    $employeeTypeFilter: String
  ) {
    employees(
      query: $query
      limit: $limit
      page: $page
      sort: $sort
      sortOrder: $sortOrder
      titleFilter: $titleFilter
      departmentFilter: $departmentFilter
      employeeTypeFilter: $employeeTypeFilter
    ) {
      total
      data {
        id
        firstName
        lastName
        email
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }
  }
`;

export default GET_EMPLOYEES;


export { GET_EMPLOYEES };
