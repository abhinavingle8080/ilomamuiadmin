/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const getLeavesApi = (data) => {
    return postMethod('/superadmin/get-leaves', data);
};

export const getLeaveApi = (data) => {
    return postMethod('/superadmin/get-leave', data);
};

export const createLeaveApi = (data) => {
    return postMethod('/superadmin/create-leave', data);
};

export const updateLeaveApi = (data) => {
    return postMethod('/superadmin/update-leave', data); 
};

export const deleteLeaveApi = (data) => {
    return postMethod('/superadmin/delete-leave', data);
};
/* eslint-disable arrow-body-style */
