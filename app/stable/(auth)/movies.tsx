import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Movies() {
  return (
    <ViewManagerPage
      controller='movies/moviesrecommended'
      view='movies/movies.html'
    />
  );
}
