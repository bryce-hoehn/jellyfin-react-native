import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LogsPage = lazy(() => import('../../../src/apps/dashboard/routes/logs/index').then(m => ({ default: m.Component })));

export default function Logs() {
  return (
    <Suspense fallback={<Loading />}>
      <LogsPage />
    </Suspense>
  );
}
