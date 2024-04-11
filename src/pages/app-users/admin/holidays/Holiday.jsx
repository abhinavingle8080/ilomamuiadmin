import { Helmet } from 'react-helmet-async';

import Holidays from './Holidays';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Holiday | list  </title>
      </Helmet>

      <Holidays />
    </>
  );
}
