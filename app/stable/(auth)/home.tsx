import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Home() {
  return (
    <ViewManagerPage
      controller='home'
      view='home.html'
    />
  );
}
