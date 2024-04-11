/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const loginApi = (data) => {
    return postMethod('/superadmin/login', data);
};

export const changePasswordApi = (data) => {
    return postMethod('/superadmin/change-password', data);
};
/* eslint-disable arrow-body-style */
