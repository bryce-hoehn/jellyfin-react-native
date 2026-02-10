import React from 'react';

import ViewManagerPage from '../../../src/components/viewManager/ViewManagerPage';

export default function ForgotPasswordPin() {
  return (
    <ViewManagerPage
      controller='session/resetPassword/index'
      view='session/resetPassword/index.html'
    />
  );
}
