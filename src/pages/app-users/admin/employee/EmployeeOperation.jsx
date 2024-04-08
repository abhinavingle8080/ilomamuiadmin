import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// @mui
import { Container } from '@mui/material';

// sections
import EmployeeForm from './EmployeeForm';
import ViewEmployee from './view/ViewEmployee';
// components
import Page from '../../../../components/Page';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { getEmployeeApi } from '../../../../apis/employee/EmployeeApis';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';


// ----------------------------------------------------------------------

export default function EmployeeOperation() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');
  const [data, setData] = useState({});

  let name;
  let heading;
  const mainTitle = 'Employees';
  const title = 'Employee';

  if (isEdit) {
    name = 'Update';
    heading = `Update ${title}`;
  } else if (isView) {
    name = 'View';
    heading = `View ${title}`;
  } else {
    name = 'Create';
    heading = `Create ${title}`;
  }

  const getEmployee = (employeeId) => {
    if (isEdit || isView) {
      getEmployeeApi({ employee_id: employeeId })
        .then((res) => {
          setData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(
    () => {
      getEmployee(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  return (
    <Page title={`${name} Employee`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={heading}
          links={[
            { name: 'Dashboard', href: '/' },
            { name: `${mainTitle}`, href: '/employees' },
            { name: `${name} ${title}` },
          ]}
        />

        {isView ? (
          <ViewEmployee details={data} logs={data} />
        ) : (
          <EmployeeForm isEdit={isEdit} data={data} />
        )}
      </Container>
    </Page>
  );
}
