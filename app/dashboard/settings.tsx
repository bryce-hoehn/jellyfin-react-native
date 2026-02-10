import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const SettingsPage = lazy(() => import('../../src/apps/dashboard/routes/settings/index').then(m => ({ default: m.Component })));

export default function Settings() {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsPage />
    </Suspense>
  );
}
