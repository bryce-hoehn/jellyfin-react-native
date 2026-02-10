import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Tv() {
  return (
    <ViewManagerPage
      controller='shows/tvrecommended'
      view='shows/tvrecommended.html'
    />
  );
}
