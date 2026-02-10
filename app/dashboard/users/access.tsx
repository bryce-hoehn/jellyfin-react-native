import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserAccessPage = lazy(() => import('../../../src/apps/dashboard/routes/users/access').then(m => ({ default: m.Component })));

export default function UserAccess() {
  return (
    <Suspense fallback={<Loading />}>
      <UserAccessPage />
    </Suspense>
  );
}
