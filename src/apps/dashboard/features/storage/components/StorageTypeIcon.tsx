import React, { type FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StorageType } from '../constants/StorageType';

interface StorageTypeIconProps {
    type?: string | null
    size?: number
}

const StorageTypeIcon: FC<StorageTypeIconProps> = ({
    type,
    size = 24
}) => {
    switch (type) {
        case StorageType.CDRom:
            return <Icon name="album" size={size} />;
        case StorageType.Network:
            return <Icon name="lan" size={size} />;
        case StorageType.Ram:
            return <Icon name="memory" size={size} />;
        case StorageType.Removable:
            return <Icon name="usb" size={size} />;
        default:
            return <Icon name="storage" size={size} />;
    }
};

export default StorageTypeIcon;
