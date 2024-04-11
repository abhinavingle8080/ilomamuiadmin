import React from 'react';
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
            label: 'Holiday Name',
            value: data?.name,
        },
        {
            label: 'date',
            value: data?.Levels?.map((item) => item?.level).join(', '),
        },
        {
            label: 'duration',
            value: data?.duration,
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
