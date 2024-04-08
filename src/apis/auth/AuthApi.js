/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const loginApi = (data) => {
    return postMethod('/superadmin/login', data);
};

export const resetPasswordApi = (data) => {
    return postMethod('/superadmin/reset-password', data);
};
/* eslint-disable arrow-body-style */
