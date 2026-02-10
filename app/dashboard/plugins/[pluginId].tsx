import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PluginPage = lazy(() => import('../../../src/apps/dashboard/routes/plugins/plugin').then(m => ({ default: m.Component })));

export default function Plugin() {
  return (
    <Suspense fallback={<Loading />}>
      <PluginPage />
    </Suspense>
  );
}
