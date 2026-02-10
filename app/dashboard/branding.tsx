import React, { Suspense, lazy } from 'react';

import Loading from '../../src/components/loading/LoadingComponent';

const BrandingPage = lazy(() => import('../../src/apps/dashboard/routes/branding/index').then(m => ({ default: m.Component })));

export default function Branding() {
  return (
    <Suspense fallback={<Loading />}>
      <BrandingPage />
    </Suspense>
  );
}
