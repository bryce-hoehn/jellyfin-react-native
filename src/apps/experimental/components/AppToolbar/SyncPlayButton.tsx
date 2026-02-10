import { SyncPlayUserAccessType } from '@jellyfin/sdk/lib/generated-client/models/sync-play-user-access-type';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import React, { useCallback, useState } from 'react';

import { pluginManager } from 'components/pluginManager';
import { useApi } from 'hooks/useApi';
import { translate } from 'lib/globalize';
import { PluginType } from 'types/plugin';

import AppSyncPlayMenu, { ID } from './menus/SyncPlayMenu';

const SyncPlayButton = () => {
    const { user } = useApi();

    const [ syncPlayMenuAnchorEl, setSyncPlayMenuAnchorEl ] = useState<null | HTMLElement>(null);
    const isSyncPlayMenuOpen = Boolean(syncPlayMenuAnchorEl);

    const onSyncPlayButtonPress = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setSyncPlayMenuAnchorEl(event.currentTarget);
    }, [ setSyncPlayMenuAnchorEl ]);

    const onSyncPlayMenuClose = useCallback(() => {
        setSyncPlayMenuAnchorEl(null);
    }, [ setSyncPlayMenuAnchorEl ]);

    if (
        // SyncPlay not enabled for user
        (user?.Policy && user.Policy.SyncPlayAccess === SyncPlayUserAccessType.None)
        // SyncPlay plugin is not loaded
        || pluginManager.ofType(PluginType.SyncPlay).length === 0
    ) {
        return null;
    }

    // TODO: Menu component needs refactoring
    return (
        <>
            {/* TODO: Tooltip not available in RN Paper - consider react-native-paper-tooltip */}
            {/* TODO: size prop not directly supported in RN Paper IconButton */}
            {/* TODO: color='inherit' not supported - use theme colors */}
            {/* TODO: aria-* props not supported in React Native */}
            <IconButton
                icon={() => <Icon name="groups" size={24} />}
                onPress={onSyncPlayButtonPress}
            />

            <AppSyncPlayMenu
                open={isSyncPlayMenuOpen}
                anchorEl={syncPlayMenuAnchorEl}
                onMenuClose={onSyncPlayMenuClose}
            />
        </>
    );
};

export default SyncPlayButton;
