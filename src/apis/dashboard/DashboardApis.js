/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const getDashboardApi = (data) => {
    return postMethod('/superadmin/get-dashboard', data);
};

/* eslint-disable arrow-body-style */
