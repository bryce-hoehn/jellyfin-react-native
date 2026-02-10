import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PlaybackTrickplayPage = lazy(() => import('../../../src/apps/dashboard/routes/playback/trickplay').then(m => ({ default: m.Component })));

export default function PlaybackTrickplay() {
  return (
    <Suspense fallback={<Loading />}>
      <PlaybackTrickplayPage />
    </Suspense>
  );
}
