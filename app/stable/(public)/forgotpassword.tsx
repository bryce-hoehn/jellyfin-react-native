import React, { lazy, Suspense } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const ForgotPasswordPage = lazy(() => import('../../../src/apps/stable/routes/session/forgotPassword/index'));

export default function ForgotPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
