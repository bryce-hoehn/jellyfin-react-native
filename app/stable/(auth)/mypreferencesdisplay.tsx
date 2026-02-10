import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function MyPreferencesDisplay() {
  return (
    <ViewManagerPage
      controller='user/display/index'
      view='user/display/index.html'
    />
  );
}
