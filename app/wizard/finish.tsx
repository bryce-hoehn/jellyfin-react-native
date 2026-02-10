import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function Finish() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='finish/index'
      view='finish/index.html'
    />
  );
}
