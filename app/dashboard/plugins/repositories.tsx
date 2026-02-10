import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const PluginRepositoriesPage = lazy(() => import('../../../src/apps/dashboard/routes/plugins/repositories').then(m => ({ default: m.Component })));

export default function PluginRepositories() {
  return (
    <Suspense fallback={<Loading />}>
      <PluginRepositoriesPage />
    </Suspense>
  );
}
