import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import { Card, List, ListItem, Container, Typography, ListItemText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { getDashboardApi } from 'src/apis/dashboard/DashboardApis';
import moment from 'moment';

import AppWidgetSummary from './app-widget-summary';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardApi()
      .then((response) => {
        setDashboardData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Employees"
            total={dashboardData?.EmployeeCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="This Month's Holidays"
            total={4}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/holiday.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Pending Leaves"
            total={dashboardData?.pendingLeaveCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/pending.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Recent Birthday"
            total={dashboardData?.recentBirthdays?.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/cake.png" />}
          />
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h4" sx={{ p: 3 }}>
              This Month&apos;s Holidays
            </Typography>
            <List>
              {dashboardData?.thisMonthHolidayCount &&
                dashboardData?.thisMonthHolidayCount?.rows.length > 0 &&
                dashboardData?.thisMonthHolidayCount?.rows.map((holiday) => (
                  <ListItem key={holiday.id} >
                    <ListItemText primary={holiday.name} />
                    <ListItemText
                      style={{ textAlign: 'right' }}
                      primary={moment(holiday.date).format('DD-MM-YYYY')}
                    />
                  </ListItem>
                ))}
              {dashboardData?.thisMonthHolidayCount?.rows?.length === 0 && (
                <ListItem>No Data Found</ListItem>
              )}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h4" sx={{ p: 3 }}>
              Recent Birthdays
            </Typography>
            <List>
              {dashboardData?.recentBirthdays && dashboardData?.recentBirthdays?.length > 0 ? (
                dashboardData?.recentBirthdays?.map((data) => (
                  <ListItem key={data.id} divider style={{ display: 'block' }}>
                    <Grid container alignItems="center">
                      <Grid item xs={4} md={4} lg={4}>
                        <ListItemText primary={`${data.first_name} ${data.last_name}`} />
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <ListItemText primary={moment(data.date).format('DD-MM-YYYY')} />
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <ListItemText primary={`${data.age} years`} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))
              ) : (
                <ListItem>No Data Found</ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
