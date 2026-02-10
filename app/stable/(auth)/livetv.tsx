import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function LiveTv() {
  return (
    <ViewManagerPage
      controller='livetv/livetvsuggested'
      view='livetv.html'
    />
  );
}
