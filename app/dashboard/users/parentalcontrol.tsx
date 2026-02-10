import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserParentalControlPage = lazy(() => import('../../../src/apps/dashboard/routes/users/parentalcontrol').then(m => ({ default: m.Component })));

export default function UserParentalControl() {
  return (
    <Suspense fallback={<Loading />}>
      <UserParentalControlPage />
    </Suspense>
  );
}
