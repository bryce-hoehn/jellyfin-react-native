import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const DevicesPage = lazy(() => import('../../src/apps/dashboard/routes/devices/index').then(m => ({ default: m.Component })));

export default function Devices() {
  return (
    <Suspense fallback={<Loading />}>
      <DevicesPage />
    </Suspense>
  );
}
