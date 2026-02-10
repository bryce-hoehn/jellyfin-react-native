import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserProfilePage = lazy(() => import('../../../src/apps/dashboard/routes/users/profile').then(m => ({ default: m.Component })));

export default function UserProfile() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfilePage />
    </Suspense>
  );
}
