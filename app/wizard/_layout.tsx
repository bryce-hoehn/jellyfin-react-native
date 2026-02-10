import { Slot } from 'expo-router';
import React from 'react';

import ConnectionRequired from '../../src/components/ConnectionRequired';
import AppLayout from '../../src/apps/stable/AppLayout';

export default function WizardLayout() {
  return (
    <ConnectionRequired level='wizard'>
      <AppLayout>
        <Slot />
      </AppLayout>
    </ConnectionRequired>
  );
}
