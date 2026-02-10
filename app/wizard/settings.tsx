import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function Settings() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='settings/index'
      view='settings/index.html'
    />
  );
}
