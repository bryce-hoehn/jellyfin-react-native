import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const SearchPage = lazy(() => import('../../../src/apps/stable/routes/search'));

export default function Search() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPage />
    </Suspense>
  );
}
