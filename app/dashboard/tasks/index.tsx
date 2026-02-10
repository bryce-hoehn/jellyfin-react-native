import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const TasksPage = lazy(() => import('../../../src/apps/dashboard/routes/tasks/index').then(m => ({ default: m.Component })));

export default function Tasks() {
  return (
    <Suspense fallback={<Loading />}>
      <TasksPage />
    </Suspense>
  );
}
