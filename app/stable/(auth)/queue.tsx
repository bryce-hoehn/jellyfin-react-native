import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Queue() {
  return (
    <ViewManagerPage
      controller='playback/queue/index'
      view='playback/queue/index.html'
      isFullscreen={true}
      isNowPlayingBarEnabled={false}
      isThemeMediaSupported={true}
    />
  );
}
