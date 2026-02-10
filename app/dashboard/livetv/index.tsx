import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LiveTvPage = lazy(() => import('../../../src/apps/dashboard/routes/livetv/index').then(m => ({ default: m.Component })));

export default function LiveTv() {
  return (
    <Suspense fallback={<Loading />}>
      <LiveTvPage />
    </Suspense>
  );
}
