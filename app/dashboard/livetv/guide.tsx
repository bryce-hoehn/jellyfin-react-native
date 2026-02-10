import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../../src/constants/appType';

export default function LiveTvGuide() {
  return (
    <ViewManagerPage
      appType={AppType.Dashboard}
      controller='livetvguideprovider'
      view='livetvguideprovider.html'
    />
  );
}
