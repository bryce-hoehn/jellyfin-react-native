import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function RemoteAccess() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='remote/index'
      view='remote/index.html'
    />
  );
}
