import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const MyPreferencesDisplayPage = lazy(() => import('../../../src/apps/experimental/routes/user/display'));

export default function MyPreferencesDisplay() {
  return (
    <Suspense fallback={<Loading />}>
      <MyPreferencesDisplayPage />
    </Suspense>
  );
}
