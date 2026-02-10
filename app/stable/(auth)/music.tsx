import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Music() {
  return (
    <ViewManagerPage
      controller='music/musicrecommended'
      view='music/music.html'
    />
  );
}
