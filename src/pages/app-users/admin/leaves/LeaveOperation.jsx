import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// @mui
import { Container } from '@mui/material';

// sections
import LeaveForm from './LeaveForm';
import ViewLeave from './view/ViewLeave';
// components
import Page from '../../../../components/Page';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { getLeaveApi } from '../../../../apis/leave/LeaveApis';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';


// ----------------------------------------------------------------------

export default function LeaveOperation() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');
  const [data, setData] = useState({});

  let name;
  let heading;
  const mainTitle = 'Leaves';
  const title = 'Leave';

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

  const getLeave = (leaveId) => {
    if (isEdit || isView) {
      getLeaveApi({ leave_id: leaveId })
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
      getLeave(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  return (
    <Page title={`${name} Leaves`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={heading}
          links={[
            { name: 'Dashboard', href: '/' },
            { name: `${mainTitle}`, href: '/leaves' },
            { name: `${name} ${title}` },
          ]}
        />

        {isView ? (
          <ViewLeave details={data} logs={data} />
        ) : (
          <LeaveForm isEdit={isEdit} data={data} />
        )}
      </Container>
    </Page>
  );
}
