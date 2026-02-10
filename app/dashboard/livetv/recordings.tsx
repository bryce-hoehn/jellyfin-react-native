import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const LiveTvRecordingsPage = lazy(() => import('../../../src/apps/dashboard/routes/livetv/recordings').then(m => ({ default: m.Component })));

export default function LiveTvRecordings() {
  return (
    <Suspense fallback={<Loading />}>
      <LiveTvRecordingsPage />
    </Suspense>
  );
}
