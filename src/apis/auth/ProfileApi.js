/* eslint-disable arrow-body-style */
import {postMethod, postFormDataMethod  } from "../apiConfig";

export const getProfileApi = (data) => {
    return postMethod('/superadmin/get-profile-detail', data);
};

export const updateProfileApi = (data) => {
    return postFormDataMethod('/superadmin/update-profile', data);
}
/* eslint-disable arrow-body-style */
