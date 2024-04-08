import { Helmet } from 'react-helmet-async';

import Employees from './Employees';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Employee | list  </title>
      </Helmet>

      <Employees />
    </>
  );
}
