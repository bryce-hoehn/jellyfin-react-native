import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Details() {
  return (
    <ViewManagerPage
      controller='itemDetails/index'
      view='itemDetails/index.html'
    />
  );
}
