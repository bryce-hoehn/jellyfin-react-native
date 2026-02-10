import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const BackupsPage = lazy(() => import('../../src/apps/dashboard/routes/backups/index').then(m => ({ default: m.Component })));

export default function Backups() {
  return (
    <Suspense fallback={<Loading />}>
      <BackupsPage />
    </Suspense>
  );
}
