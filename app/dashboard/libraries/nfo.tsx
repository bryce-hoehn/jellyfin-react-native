import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LibrariesNfoPage = lazy(() => import('../../../src/apps/dashboard/routes/libraries/nfo').then(m => ({ default: m.Component })));

export default function LibrariesNfo() {
  return (
    <Suspense fallback={<Loading />}>
      <LibrariesNfoPage />
    </Suspense>
  );
}
