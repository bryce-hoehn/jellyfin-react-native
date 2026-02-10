import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function Login() {
  return (
    <ViewManagerPage
      controller='session/login/index'
      view='session/login/index.html'
    />
  );
}
