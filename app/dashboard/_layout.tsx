import { Slot } from 'expo-router';
import React from 'react';

import ConnectionRequired from '../../src/components/ConnectionRequired';
import { Component as AppLayout } from '../../src/apps/dashboard/AppLayout';

export default function DashboardLayout() {
  return (
    <ConnectionRequired level='admin'>
      <AppLayout>
        <Slot />
      </AppLayout>
    </ConnectionRequired>
  );
}
