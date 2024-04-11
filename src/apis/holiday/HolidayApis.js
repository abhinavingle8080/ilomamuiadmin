/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const getHolidaysApi = (data) => {
    return postMethod('/superadmin/get-holidays', data);
};

export const getHolidayApi = (data) => {
    return postMethod('/superadmin/get-holiday', data);
};

export const createHolidayApi = (data) => {
    return postMethod('/superadmin/create-holiday', data);
};

export const updateHolidayApi = (data) => {
    return postMethod('/superadmin/update-holiday', data);
};

export const deleteHolidayApi = (data) => {
    return postMethod('/superadmin/delete-holiday', data);
};
/* eslint-disable arrow-body-style */
