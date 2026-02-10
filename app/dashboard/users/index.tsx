import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UsersPage = lazy(() => import('../../../src/apps/dashboard/routes/users/index').then(m => ({ default: m.Component })));

export default function Users() {
  return (
    <Suspense fallback={<Loading />}>
      <UsersPage />
    </Suspense>
  );
}
