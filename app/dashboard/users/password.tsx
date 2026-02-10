import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserPasswordPage = lazy(() => import('../../../src/apps/dashboard/routes/users/password').then(m => ({ default: m.Component })));

export default function UserPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <UserPasswordPage />
    </Suspense>
  );
}
