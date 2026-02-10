import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const QuickConnectPage = lazy(() => import('../../../src/apps/stable/routes/quickConnect'));

export default function QuickConnect() {
  return (
    <Suspense fallback={<Loading />}>
      <QuickConnectPage />
    </Suspense>
  );
}
