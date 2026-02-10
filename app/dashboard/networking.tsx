import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function Networking() {
  return (
    <ViewManagerPage
      appType={AppType.Dashboard}
      controller='networking'
      view='networking.html'
    />
  );
}
