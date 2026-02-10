import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PlaybackResumePage = lazy(() => import('../../../src/apps/dashboard/routes/playback/resume').then(m => ({ default: m.Component })));

export default function PlaybackResume() {
  return (
    <Suspense fallback={<Loading />}>
      <PlaybackResumePage />
    </Suspense>
  );
}
