import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LibrariesDisplayPage = lazy(() => import('../../../src/apps/dashboard/routes/libraries/display').then(m => ({ default: m.Component })));

export default function LibrariesDisplay() {
  return (
    <Suspense fallback={<Loading />}>
      <LibrariesDisplayPage />
    </Suspense>
  );
}
