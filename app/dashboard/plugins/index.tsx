import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PluginsPage = lazy(() => import('../../../src/apps/dashboard/routes/plugins/index').then(m => ({ default: m.Component })));

export default function Plugins() {
  return (
    <Suspense fallback={<Loading />}>
      <PluginsPage />
    </Suspense>
  );
}
