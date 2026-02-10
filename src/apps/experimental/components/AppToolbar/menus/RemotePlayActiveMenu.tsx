import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import SettingsRemote from '@mui/icons-material/SettingsRemote';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Menu } from 'react-native-paper';
import dialog from 'components/dialog/dialog';
import { playbackManager } from 'components/playback/playbackmanager';
import React, { FC, useCallback, useState } from 'react';
import { Link } from 'expo-router';

import { enable, isEnabled } from 'scripts/autocast';
import { translate } from 'lib/globalize';

interface RemotePlayActiveMenuProps extends MenuProps {
    onMenuClose: () => void
    playerInfo: {
        name: string
        isLocalPlayer: boolean
        id?: string
        deviceName?: string
        playableMediaTypes?: string[]
        supportedCommands?: string[]
    } | null
}

export const ID = 'app-remote-play-active-menu';

const RemotePlayActiveMenu: FC<RemotePlayActiveMenuProps> = ({
    anchorEl,
    open,
    onMenuClose,
    playerInfo
}) => {
    const [ isDisplayMirrorEnabled, setIsDisplayMirrorEnabled ] = useState(playbackManager.enableDisplayMirroring());
    const isDisplayMirrorSupported = playerInfo?.supportedCommands && playerInfo.supportedCommands.indexOf('DisplayContent') !== -1;
    const toggleDisplayMirror = useCallback(() => {
        playbackManager.enableDisplayMirroring(!isDisplayMirrorEnabled);
        setIsDisplayMirrorEnabled(!isDisplayMirrorEnabled);
    }, [ isDisplayMirrorEnabled, setIsDisplayMirrorEnabled ]);

    const [ isAutoCastEnabled, setIsAutoCastEnabled ] = useState(isEnabled());
    const toggleAutoCast = useCallback(() => {
        enable(!isAutoCastEnabled);
        setIsAutoCastEnabled(!isAutoCastEnabled);
    }, [ isAutoCastEnabled ]);

    const remotePlayerName = playerInfo?.deviceName || playerInfo?.name;

    const disconnectRemotePlayer = useCallback(() => {
        if (playbackManager.getSupportedCommands().indexOf('EndSession') !== -1) {
            dialog.show({
                buttons: [
                    {
                        name: translate('Yes'),
                        id: 'yes'
                    }, {
                        name: translate('No'),
                        id: 'no'
                    }
                ],
                text: translate('ConfirmEndPlayerSession', remotePlayerName)
            }).then(id => {
                onMenuClose();

                if (id === 'yes') {
                    playbackManager.getCurrentPlayer().endSession();
                }
                playbackManager.setDefaultPlayerActive();
            }).catch(() => {
            // Dialog closed
            });
        } else {
            onMenuClose();
            playbackManager.setDefaultPlayerActive();
        }
    }, [ onMenuClose, remotePlayerName ]);

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={ID}
            keepMounted
            open={open}
            onClose={onMenuClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'remote-play-active-subheader',
                    subheader: (
                        <ListSubheader component='div' id='remote-play-active-subheader'>
                            {remotePlayerName}
                        </ListSubheader>
                    )
                }
            }}
        >
            {isDisplayMirrorSupported && (
                <MenuItem onPress={toggleDisplayMirror}>
                    {isDisplayMirrorEnabled && (
                        <ListItemIcon>
                            <Check />
                        </ListItemIcon>
                    )}
                    <ListItemText inset={!isDisplayMirrorEnabled}>
                        {translate('EnableDisplayMirroring')}
                    </ListItemText>
                </MenuItem>
            )}

            <MenuItem onPress={toggleAutoCast}>
                {isAutoCastEnabled && (
                    <ListItemIcon>
                        <Check />
                    </ListItemIcon>
                )}
                <ListItemText inset={!isAutoCastEnabled}>
                    {translate('EnableAutoCast')}
                </ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem
                component={Link}
                href='/queue'
                onPress={onMenuClose}
            >
                <ListItemIcon>
                    <SettingsRemote />
                </ListItemIcon>
                <ListItemText>
                    {translate('HeaderRemoteControl')}
                </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onPress={disconnectRemotePlayer}>
                <ListItemIcon>
                    <Close />
                </ListItemIcon>
                <ListItemText>
                    {translate('Disconnect')}
                </ListItemText>
            </MenuItem>
        </Menu>
    );
};

export default RemotePlayActiveMenu;
