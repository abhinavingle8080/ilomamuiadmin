import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

import { Grid } from '@mui/material';

const styles = {
    gridItem: {
        borderBottom: '1px solid black',
        paddingTop: 0,
        paddingBottom: '1rem',
    },
    noBorderBottom: {
        borderBottom: 'none',
    },
};

EmployeeDetails.propTypes = {
    data: propTypes.object,
};

function EmployeeDetails({ data }) {
    const dummyData = [
        {
            label: 'Employee Name',
            value: data ? `${data?.first_name} ${data?.last_name}` : 'N/A',
        },
        {
            label: 'Designation',
            value: data?.Designation?.title ? data?.Designation?.title : 'N/A',
        },
        {
            label: 'email',
            value: data?.email ? data?.email : 'N/A',
        },
        {
            label: 'Phone Number',
            value: data?.phone_no ? `+${data?.country_code}-${data?.phone_no}` : 'N/A',
        },
        {
            label: 'Gender',
            value: data?.gender ? data?.gender : 'N/A',
        },
        {
            label: 'Date of Birth',
            value: data?.date_of_birth ? moment(data?.date_of_birth).format('DD/MM/YYYY') : 'N/A',
        },
        {
            label: 'Employment Start Date',
            value: data?.emp_start_date ? moment(data?.emp_start_date).format('DD/MM/YYYY') : 'N/A',
        },
        {
            label: 'Employment End Date',
            value: data?.emp_end_date ? moment(data?.emp_end_date).format('DD/MM/YYYY') : 'N/A',
        },
        {
            label: 'Address',
            value: data?.address ? data?.address : 'N/A',
        },
        {
            label: 'Status',
            value: data?.status ? data?.status : 'N/A',
        },
    ];

    return (
        <Grid container spacing={3} margin={0} width="100%">
            {dummyData?.map((item, index) => (
                <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                        ...styles.gridItem,
                        ...(dummyData.length === 2 ? styles.noBorderBottom : {}),
                    }}
                    key={index}
                >
                    {/* Two  */}
                    <Grid container spacing={3} margin={0} width="100%">
                        <Grid item xs={12} md={4}>
                    <h4 style={{
                                fontSize: '16px',
                            }}>{item?.label}</h4>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <p>{item?.value}</p>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default EmployeeDetails;
