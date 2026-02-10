import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function AddServer() {
  return (
    <ViewManagerPage
      controller='session/addServer/index'
      view='session/addServer/index.html'
    />
  );
}
