import { gql } from "@apollo/client";
const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      id
      firstName
      lastName
      email
      dateOfJoining
      title
      age
      department
      employeeType
      currentStatus
    }
  }
`;
const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $dateOfJoining: String!
    $title: String!
    $age: String!
    $department: String!
    $employeeType: String!
    $currentStatus: Int!
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      dateOfJoining: $dateOfJoining
      title: $title
      age: $age
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
      id
      firstName
      lastName
      email
      dateOfJoining
      title
      age
      department
      employeeType
      currentStatus
    }
  }
`;
const CREATE_EMPLOYEE = gql`
  mutation addEmployee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $dateOfJoining: String!
    $title: String!
    $age: String!
    $department: String!
    $employeeType: String!
    # $currentStatus: Int!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      email: $email
      dateOfJoining: $dateOfJoining
      title: $title
      age: $age
      department: $department
      employeeType: $employeeType
    #   currentStatus: $currentStatus
    ) {
      firstName
      lastName
      email
      dateOfJoining
      title
      age
      department
      employeeType
      currentStatus
    }
  }
`;

export { DELETE_EMPLOYEE, UPDATE_EMPLOYEE, CREATE_EMPLOYEE };
