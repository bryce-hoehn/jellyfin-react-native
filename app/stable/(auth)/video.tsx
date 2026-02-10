import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Video() {
  return (
    <ViewManagerPage
      controller='playback/video/index'
      view='playback/video/index.html'
      type='video-osd'
      isFullscreen={true}
      isNowPlayingBarEnabled={false}
      isThemeMediaSupported={true}
    />
  );
}
