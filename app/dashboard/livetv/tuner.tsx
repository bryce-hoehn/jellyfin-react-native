import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../../src/constants/appType';

export default function LiveTvTuner() {
  return (
    <ViewManagerPage
      appType={AppType.Dashboard}
      controller='livetvtuner'
      view='livetvtuner.html'
    />
  );
}
