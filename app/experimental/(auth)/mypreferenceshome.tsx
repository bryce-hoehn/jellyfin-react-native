import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function MyPreferencesHome() {
  return (
    <ViewManagerPage
      controller='user/home/index'
      view='user/home/index.html'
    />
  );
}
