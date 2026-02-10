import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const MoviesPage = lazy(() => import('../../../src/apps/experimental/routes/movies'));

export default function Movies() {
  return (
    <Suspense fallback={<Loading />}>
      <MoviesPage />
    </Suspense>
  );
}
