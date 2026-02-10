import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const TvPage = lazy(() => import('../../../src/apps/experimental/routes/shows'));

export default function Tv() {
  return (
    <Suspense fallback={<Loading />}>
      <TvPage />
    </Suspense>
  );
}
