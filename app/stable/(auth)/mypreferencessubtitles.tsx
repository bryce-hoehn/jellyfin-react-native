import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function MyPreferencesSubtitles() {
  return (
    <ViewManagerPage
      controller='user/subtitles/index'
      view='user/subtitles/index.html'
    />
  );
}
