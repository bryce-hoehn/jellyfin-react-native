import { Slot } from 'expo-router';
import React from 'react';

import ConnectionRequired from '../../../src/components/ConnectionRequired';

export default function PublicLayout() {
  return (
    <ConnectionRequired level='public'>
      <Slot />
    </ConnectionRequired>
  );
}
