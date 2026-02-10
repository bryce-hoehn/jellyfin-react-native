import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const DashboardPage = lazy(() => import('../../src/apps/dashboard/routes/index').then(m => ({ default: m.Component })));

export default function Index() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardPage />
    </Suspense>
  );
}
