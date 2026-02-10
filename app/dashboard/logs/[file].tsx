import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LogFilePage = lazy(() => import('../../../src/apps/dashboard/routes/logs/file').then(m => ({ default: m.Component })));

export default function LogFile() {
  return (
    <Suspense fallback={<Loading />}>
      <LogFilePage />
    </Suspense>
  );
}
