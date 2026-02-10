import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function MyPreferencesPlayback() {
  return (
    <ViewManagerPage
      controller='user/playback/index'
      view='user/playback/index.html'
    />
  );
}
