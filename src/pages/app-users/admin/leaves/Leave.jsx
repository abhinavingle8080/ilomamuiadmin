import { Helmet } from 'react-helmet-async';

import Holidays from './Leaves';

// ----------------------------------------------------------------------

export default function Leave() {
  return (
    <>
      <Helmet>
        <title> Leave | list  </title>
      </Helmet>

      <Holidays />
    </>
  );
}
