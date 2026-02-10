import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function MyPreferencesControls() {
  return (
    <ViewManagerPage
      controller='user/controls/index'
      view='user/controls/index.html'
    />
  );
}
