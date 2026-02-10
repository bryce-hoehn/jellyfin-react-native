import { Slot } from 'expo-router';
import React from 'react';

import AppHeader from '../../src/components/AppHeader';
import Backdrop from '../../src/components/Backdrop';

export default function StableLayout() {
  return (
    <>
      <AppHeader isHidden />
      <Backdrop />
      <Slot />
    </>
  );
}
