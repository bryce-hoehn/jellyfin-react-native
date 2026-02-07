import React, { type FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StorageType } from '../constants/StorageType';

interface StorageTypeIconProps {
    type?: string | null
}

const StorageTypeIcon: FC<StorageTypeIconProps> = ({
    type
}) => {
    switch (type) {
        case StorageType.CDRom:
            return <Icon name="album" />;
        case StorageType.Network:
            return <Icon name="lan" />;
        case StorageType.Ram:
            return <Icon name="memory" />;
        case StorageType.Removable:
            return <Icon name="usb" />;
        default:
            return <Icon name="storage" />;
    }
};

export default StorageTypeIcon;
