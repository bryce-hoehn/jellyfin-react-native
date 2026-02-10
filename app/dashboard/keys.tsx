import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const KeysPage = lazy(() => import('../../src/apps/dashboard/routes/keys/index').then(m => ({ default: m.Component })));

export default function Keys() {
  return (
    <Suspense fallback={<Loading />}>
      <KeysPage />
    </Suspense>
  );
}
