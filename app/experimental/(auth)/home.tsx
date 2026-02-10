import React, { lazy, Suspense } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const HomePage = lazy(() => import('../../src/apps/experimental/routes/home'));

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  );
}
