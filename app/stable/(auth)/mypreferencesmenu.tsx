import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const MyPreferencesMenuPage = lazy(() => import('../../../src/apps/stable/routes/user/settings/index'));

export default function MyPreferencesMenu() {
  return (
    <Suspense fallback={<Loading />}>
      <MyPreferencesMenuPage />
    </Suspense>
  );
}
