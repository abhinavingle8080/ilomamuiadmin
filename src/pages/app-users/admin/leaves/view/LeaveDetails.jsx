import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';

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

// "data": {
//     "id": 1,
//     "start_date": "2024-04-12T17:54:52.000Z",
//     "end_date": "2024-04-15T17:54:52.000Z",
//     "reason": "Sick Leave",
//     "status": "Pending",
//     "remark": null,
//     "Employee": {
//         "id": 3,
//         "first_name": "Abhinav",
//         "last_name": "Ingle",
//         "email": "abbb@gmail.com"
//     },
//     "LeaveDays": [
//         {
//             "id": 1,
//             "date": "2024-04-12T17:54:52.000Z",
//             "duration": "FullDay",
//             "is_holiday": false
//         },
//         {
//             "id": 2,
//             "date": "2024-04-13T17:54:52.000Z",
//             "duration": "FullDay",
//             "is_holiday": false
//         },
//         {
//             "id": 3,
//             "date": "2024-04-14T17:54:52.000Z",
//             "duration": "FullDay",
//             "is_holiday": false
//         },
//         {
//             "id": 4,
//             "date": "2024-04-15T17:54:52.000Z",
//             "duration": "FullDay",
//             "is_holiday": false
//         }
//     ]
// },

LeaveDetails.propTypes = {
  data: propTypes.object,
};

function LeaveDetails({ data }) {
  const dummyData = [
    {
      label: 'Applicant Name',
      value: data ? `${data?.Employee?.first_name} ${data?.Employee?.last_name}` : 'N/A',
    },
    {
      label: 'Duration',
      value: data?.LeaveDays?.length ? data?.LeaveDays?.length : 'N/A',
    },
    {
      label: 'Reason',
      value: data?.reason ? data?.reason : 'N/A',
    },
    {
      label: 'Start Date',
      value: data?.start_date ? moment(data?.start_date).format('DD/MM/YYYY') : 'N/A',
    },
    {
      label: 'End Date',
      value: data?.end_date ? moment(data?.end_date).format('DD/MM/YYYY') : 'N/A',
    },
    {
      label: 'Status',
      value: data?.status ? data?.status : 'N/A',
    },
    {
      label: 'Remark',
      value: data?.remark ? data?.remark : 'N/A',
    },
    {
      label: 'Applied On',
      value: data?.created_at ? moment(data?.created_at).format('DD/MM/YYYY') : 'N/A',
    },
  ];

  const LeaveDays = data?.LeaveDays;

  return (
    <>
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
                <h4
                  style={{
                    fontSize: '16px',
                  }}
                >
                  {item?.label}
                </h4>
              </Grid>

              <Grid item xs={12} md={8}>
                <p>{item?.value}</p>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" p={2}>
          {' '}
          Leave Days
        </Typography>
      <Grid container spacing={3} margin={0} width="100%">
        {LeaveDays?.map((day, index) => (
          <Grid
            item
            xs={12}
            md={6}
            style={{
              ...styles.gridItem,
              ...(dummyData.length === 2 ? styles.noBorderBottom : {}),
            }}
            key={index}
            marginTop="1rem"
          >
            {/* Two  */}
            <Grid container spacing={3} margin={0} width="100%">
              <Grid item xs={12} md={4}>
                <h4
                  style={{
                    fontSize: '16px',
                  }}
                >
                  {moment(day?.date).format('DD/MM/YYYY')}
                </h4>
              </Grid>
              <Grid item xs={12} md={8}>
                <p>{day?.duration}</p>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LeaveDetails;
