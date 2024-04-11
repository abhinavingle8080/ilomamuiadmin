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

HolidayDetails.propTypes = {
    data: propTypes.object,
};

function HolidayDetails({ data }) {
    const dummyData = [
        {
            label: 'Holiday Name',
            value: data ? data?.name : 'N/A',
        },
        {
            label: 'Date',
            value: data?.date ? moment(data?.date_of_birth).format('DD/MM/YYYY') : 'N/A',
        },
        {
            label: 'Description',
            value: data?.description ? data?.description : 'N/A',
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

export default HolidayDetails;
