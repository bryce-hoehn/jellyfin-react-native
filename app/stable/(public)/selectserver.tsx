import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function SelectServer() {
  return (
    <ViewManagerPage
      controller='session/selectServer/index'
      view='session/selectServer/index.html'
    />
  );
}
