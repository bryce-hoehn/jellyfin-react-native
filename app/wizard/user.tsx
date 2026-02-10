import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function User() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='user/index'
      view='user/index.html'
    />
  );
}
