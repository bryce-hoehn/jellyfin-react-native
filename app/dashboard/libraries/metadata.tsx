import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LibrariesMetadataPage = lazy(() => import('../../../src/apps/dashboard/routes/libraries/metadata').then(m => ({ default: m.Component })));

export default function LibrariesMetadata() {
  return (
    <Suspense fallback={<Loading />}>
      <LibrariesMetadataPage />
    </Suspense>
  );
}
