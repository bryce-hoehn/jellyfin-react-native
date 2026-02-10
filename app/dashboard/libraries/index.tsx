import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LibrariesPage = lazy(() => import('../../../src/apps/dashboard/routes/libraries/index').then(m => ({ default: m.Component })));

export default function Libraries() {
  return (
    <Suspense fallback={<Loading />}>
      <LibrariesPage />
    </Suspense>
  );
}
