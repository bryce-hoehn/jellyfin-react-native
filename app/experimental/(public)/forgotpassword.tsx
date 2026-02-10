import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function ForgotPassword() {
  return (
    <ViewManagerPage
      controller='session/forgotPassword/index'
      view='session/forgotPassword/index.html'
    />
  );
}
