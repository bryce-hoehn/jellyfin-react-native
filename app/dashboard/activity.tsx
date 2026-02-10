import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const ActivityPage = lazy(() => import('../../src/apps/dashboard/routes/activity/index').then(m => ({ default: m.Component })));

export default function Activity() {
  return (
    <Suspense fallback={<Loading />}>
      <ActivityPage />
    </Suspense>
  );
}
