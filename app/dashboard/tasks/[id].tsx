import React, { Suspense, lazy } from 'react';

import Loading from '../../../src/components/loading/LoadingComponent';

const TaskPage = lazy(() => import('../../../src/apps/dashboard/routes/tasks/task').then(m => ({ default: m.Component })));

export default function Task() {
  return (
    <Suspense fallback={<Loading />}>
      <TaskPage />
    </Suspense>
  );
}
