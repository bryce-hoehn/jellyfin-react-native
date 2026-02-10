import React from 'react';

import ViewManagerPage from '../../src/components/viewManager/ViewManagerPage';
import { AppType } from '../../src/constants/appType';

export default function Library() {
  return (
    <ViewManagerPage
      appType={AppType.Wizard}
      controller='library'
      view='library.html'
    />
  );
}
