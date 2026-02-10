import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const HomeVideosPage = lazy(() => import('../../../src/apps/experimental/routes/homevideos'));

export default function HomeVideos() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeVideosPage />
    </Suspense>
  );
}
