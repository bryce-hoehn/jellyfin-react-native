import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PlaybackStreamingPage = lazy(() => import('../../../src/apps/dashboard/routes/playback/streaming').then(m => ({ default: m.Component })));

export default function PlaybackStreaming() {
  return (
    <Suspense fallback={<Loading />}>
      <PlaybackStreamingPage />
    </Suspense>
  );
}
