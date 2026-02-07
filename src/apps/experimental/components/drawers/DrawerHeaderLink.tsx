import { View } from 'react-native';
import React from 'react';

import { useSystemInfo } from 'hooks/useSystemInfo';
import ListItemLink from 'components/ListItemLink';

import appIcon from '@jellyfin/ux-web/icon-transparent.png';

// TODO: ListItemIcon and ListItemText are MUI List components - need custom RN Paper List.Item implementation

const DrawerHeaderLink = () => {
    const { data: systemInfo } = useSystemInfo();

    return (
        <ListItemLink to='/'>
            {/* TODO: ListItemIcon - complex List component */}
            <View>
                {/* TODO: sx props (minWidth) need RN style conversion */}
                <View>
                    {/* TODO: component='img' and sx props (height) need RN Image component */}
                    {/* src={appIcon} */}
                </View>
            </View>
            {/* TODO: ListItemText - complex List component */}
            {/* primary={systemInfo?.ServerName || 'Jellyfin'} */}
            {/* secondary={systemInfo?.Version} */}
            {/* slotProps={{ primary: { variant: 'h6' } }} */}
        </ListItemLink>);
};

export default DrawerHeaderLink;
