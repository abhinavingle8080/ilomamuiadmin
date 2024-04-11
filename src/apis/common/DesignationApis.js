/* eslint-disable arrow-body-style */
import { postMethod } from "../apiConfig";

export const getDesignationApi = (data) => {
    return postMethod('/common/get-designations', data);
};

/* eslint-disable arrow-body-style */
