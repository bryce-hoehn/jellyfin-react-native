import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import Events from 'utils/events';

import RemotePlayMenu, { ID } from './menus/RemotePlayMenu';
import RemotePlayActiveMenu, { ID as ACTIVE_ID } from './menus/RemotePlayActiveMenu';

const RemotePlayButton = () => {
    const [ playerInfo, setPlayerInfo ] = useState(playbackManager.getPlayerInfo());

    const updatePlayerInfo = useCallback(() => {
        setPlayerInfo(playbackManager.getPlayerInfo());
    }, [ setPlayerInfo ]);

    useEffect(() => {
        Events.on(playbackManager, 'playerchange', updatePlayerInfo);

        return () => {
            Events.off(playbackManager, 'playerchange', updatePlayerInfo);
        };
    }, [ updatePlayerInfo ]);

    const [ remotePlayMenuAnchorEl, setRemotePlayMenuAnchorEl ] = useState<null | HTMLElement>(null);
    const isRemotePlayMenuOpen = Boolean(remotePlayMenuAnchorEl);

    const onRemotePlayButtonPress = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setRemotePlayMenuAnchorEl(event.currentTarget);
    }, [ setRemotePlayMenuAnchorEl ]);

    const onRemotePlayMenuClose = useCallback(() => {
        setRemotePlayMenuAnchorEl(null);
    }, [ setRemotePlayMenuAnchorEl ]);

    const [ remotePlayActiveMenuAnchorEl, setRemotePlayActiveMenuAnchorEl ] = useState<null | HTMLElement>(null);
    const isRemotePlayActiveMenuOpen = Boolean(remotePlayActiveMenuAnchorEl);

    const onRemotePlayActiveButtonPress = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setRemotePlayActiveMenuAnchorEl(event.currentTarget);
    }, [ setRemotePlayActiveMenuAnchorEl ]);

    const onRemotePlayActiveMenuClose = useCallback(() => {
        setRemotePlayActiveMenuAnchorEl(null);
    }, [ setRemotePlayActiveMenuAnchorEl ]);

    // TODO: Tooltip, Menu components need complex refactoring
    return (
        <>
            {(playerInfo && !playerInfo.isLocalPlayer) ? (
                // TODO: Box sx prop needs conversion to React Native styles
                <View
                    style={{
                        alignSelf: 'center'
                    }}
                >
                    {/* TODO: Tooltip not available */}
                    {/* TODO: Button startIcon prop not supported - use icon prop or custom layout */}
                    {/* TODO: variant='text' maps to mode='text' */}
                    {/* TODO: size prop not directly supported */}
                    {/* TODO: color='inherit' not supported */}
                    {/* TODO: sx prop needs conversion to styles */}
                    {/* TODO: aria-* props not supported */}
                    <Button
                        mode='text'
                        onPress={onRemotePlayActiveButtonPress}
                        icon={() => <Icon name="cast-connected" size={24} />}
                    >
                        {playerInfo.deviceName || playerInfo.name}
                    </Button>
                </View>
            ) : (
                // TODO: Tooltip not available
                // TODO: size prop not directly supported
                // TODO: color='inherit' not supported
                // TODO: aria-* props not supported
                <IconButton
                    icon={() => <Icon name="cast" size={24} />}
                    onPress={onRemotePlayButtonPress}
                />
            )}

            <RemotePlayMenu
                open={isRemotePlayMenuOpen}
                anchorEl={remotePlayMenuAnchorEl}
                onMenuClose={onRemotePlayMenuClose}
            />

            <RemotePlayActiveMenu
                open={isRemotePlayActiveMenuOpen}
                anchorEl={remotePlayActiveMenuAnchorEl}
                onMenuClose={onRemotePlayActiveMenuClose}
                playerInfo={playerInfo}
            />
        </>
    );
};

export default RemotePlayButton;
