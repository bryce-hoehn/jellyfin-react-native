import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserAddPage = lazy(() => import('../../../src/apps/dashboard/routes/users/add').then(m => ({ default: m.Component })));

export default function UserAdd() {
  return (
    <Suspense fallback={<Loading />}>
      <UserAddPage />
    </Suspense>
  );
}
