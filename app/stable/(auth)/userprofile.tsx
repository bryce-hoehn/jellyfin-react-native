import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const UserProfilePage = lazy(() => import('../../../src/apps/stable/routes/user/userprofile'));

export default function UserProfile() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfilePage />
    </Suspense>
  );
}
