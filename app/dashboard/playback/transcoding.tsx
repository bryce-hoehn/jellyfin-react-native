import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PlaybackTranscodingPage = lazy(() => import('../../../src/apps/dashboard/routes/playback/transcoding').then(m => ({ default: m.Component })));

export default function PlaybackTranscoding() {
  return (
    <Suspense fallback={<Loading />}>
      <PlaybackTranscodingPage />
    </Suspense>
  );
}
