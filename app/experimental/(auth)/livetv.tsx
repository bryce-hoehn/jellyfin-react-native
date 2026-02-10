import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LiveTvPage = lazy(() => import('../../../src/apps/experimental/routes/livetv'));

export default function LiveTv() {
  return (
    <Suspense fallback={<Loading />}>
      <LiveTvPage />
    </Suspense>
  );
}
