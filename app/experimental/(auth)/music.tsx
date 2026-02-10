import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const MusicPage = lazy(() => import('../../../src/apps/experimental/routes/music'));

export default function Music() {
  return (
    <Suspense fallback={<Loading />}>
      <MusicPage />
    </Suspense>
  );
}
