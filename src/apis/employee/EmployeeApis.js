/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const getEmployeesApi = (data) => {
    return postMethod('/superadmin/get-employees', data);
};

export const getEmployeeApi = (data) => {
    return postMethod('/superadmin/get-employee', data);
};

export const getEmployeesExportApi = (data) => {
    return postMethod('/superadmin/employee/download', data);
};

export const createEmployeeApi = (data) => {
    return postMethod('/superadmin/create-employee', data);
};

export const updateEmployeeApi = (data) => {
    return postMethod('/superadmin/update-employee', data);
};

export const deleteEmployeeApi = (data) => {
    return postMethod('/superadmin/delete-employee', data);
};
/* eslint-disable arrow-body-style */
