import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Tab,  Box, Tabs, Container } from '@mui/material';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/iconify';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
  AccountChangePassword,
} from '../../../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {

  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon='ic:round-account-box' width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'change_password',
      icon: <Iconify icon='ic:round-vpn-key' width={20} height={20} />,
      component: <AccountChangePassword />, 
    },
  ];

  return (
    <Page title="Edit Profile">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Edit Profile"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Edit Profile', href: '/profile/edit-profile' },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
