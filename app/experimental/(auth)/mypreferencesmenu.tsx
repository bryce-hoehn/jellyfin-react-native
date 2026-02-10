import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const MyPreferencesMenuPage = lazy(() => import('../../../src/apps/experimental/routes/user/settings'));

export default function MyPreferencesMenu() {
  return (
    <Suspense fallback={<Loading />}>
      <MyPreferencesMenuPage />
    </Suspense>
  );
}
