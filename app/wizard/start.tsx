import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function Start() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='start/index'
      view='start/index.html'
    />
  );
}
