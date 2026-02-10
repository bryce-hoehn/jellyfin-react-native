import icon from '@jellyfin/ux-web/icon-transparent.png';
import { Button } from 'react-native-paper';
import React, { FC } from 'react';
import { Link } from 'expo-router';
import { Image } from 'react-native';

import { useSystemInfo } from 'hooks/useSystemInfo';

const ServerButton: FC = () => {
    const {
        data: systemInfo,
        isPending
    } = useSystemInfo();

    // TODO: React Native Paper Button doesn't support startIcon prop like MUI
    // Need to refactor this component to use custom layout with icon and button
    return (
        <Button
            mode='text'
            // TODO: size prop not available in RN Paper Button
            // TODO: component and to props for Link not supported, need alternative navigation approach
        >
            {isPending ? '' : (systemInfo?.ServerName || 'Jellyfin')}
        </Button>
    );
};

export default ServerButton;
