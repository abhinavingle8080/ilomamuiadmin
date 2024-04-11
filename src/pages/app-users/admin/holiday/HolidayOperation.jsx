import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Container } from '@mui/material';

import HolidayForm from './HolidayForm';
import ViewHoliday from './view/ViewHoliday';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import { getHolidayApi } from '../../../../apis/holiday/HolidayApis';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

export default function HolidayOperation() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');
  const [data, setData] = useState({});

  let name;
  let heading;
  const mainTitle = 'Holidays';
  const title = 'Holiday';

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

  const getHoliday = useCallback((holidayId) => {
    if (isEdit || isView) {
      getHolidayApi({ holiday_id: holidayId })
        .then((res) => {
          setData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isEdit, isView]);

  useEffect(() => {
    getHoliday(id);
  }, [ id , getHoliday]);

  return (
    <Page title={`${name} ${title}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={heading}
          links={[
            { name: 'Dashboard', href: '/' },
            { name: `${mainTitle}`, href: '/holidays' },
            { name: `${name} ${title}` },
          ]}
        />

        {isView ? (
          <ViewHoliday details={data} />
        ) : (
          <HolidayForm isEdit={isEdit} data={data} />
        )}
      </Container>
    </Page>
  );
}
