import { createSlice } from '@reduxjs/toolkit';
// import { getMenuApi } from '../../apis/Menu/MenuApi';
// import { getRoleModulesByRolesApi } from '../../apis/RoleModule/RoleModuleApis';

const initialState = {
    rolepermissions: [],
    rolemodules: [],
};

const slice = createSlice({
    name: 'roleaccess',
    initialState,
    reducers: {
        getRolePermissionsSuccess(state, action) {
            state.rolepermissions = action.payload;
        },
        getRoleModulesSuccess(state, action) {
            state.rolemodules = action.payload;
        },
        updateRolePermissionsSuccess(state, action) {
            state.rolepermissions = action.payload;
        },
        updateRoleModulesSuccess(state, action) {
            state.rolemodules = action.payload;
        },
        resetRoleAccess() {
            return initialState;
        },
    },
});

export default slice.reducer;

// ----------------------------------------------------------------------

export function GetRolePermissions(roleId) {
    return async (dispatch, getState) => {
        const { roleaccess } = getState();

        if (roleaccess.rolepermissions.length > 0) {
            return;
        }

        try {
            // const res = await getRoleModulesByRolesApi({ role_id: roleId });
            // dispatch(slice.actions.getRolePermissionsSuccess(res?.data?.modules));
        } catch (error) {
            console.log(error);
        }
    };
}

export function GetRoleModules() {
    return async (dispatch, getState) => {
        const { roleaccess } = getState();

        if (roleaccess.rolemodules.length > 0) {
            return;
        }

        try {
            // const res = await getMenuApi();
            // dispatch(slice.actions.getRoleModulesSuccess(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };
}

export function UpdateRolePermissions(roleId) {
    return async (dispatch) => {
        try {
            // const res = await getRoleModulesByRolesApi({ role_id: roleId });
            // dispatch(slice.actions.getRolePermissionsSuccess(res?.data?.modules));
        } catch (error) {
            console.log(error);
        }
    };
}

export function UpdateRoleModules() {
    return async (dispatch) => {
        try {
            // const res = await getMenuApi();
            // dispatch(slice.actions.getRoleModulesSuccess(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };
}

export function ResetRoleAccess() {
    return async (dispatch) => {
        dispatch(slice.actions.resetRoleAccess());
    };
};
