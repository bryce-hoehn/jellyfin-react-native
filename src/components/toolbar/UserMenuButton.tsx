import { Tooltip } from 'react-native-paper';
import React, { useCallback, useState } from 'react';

import UserAvatar from 'components/UserAvatar';
import { useApi } from 'hooks/useApi';
import { translate } from 'lib/globalize';

import AppUserMenu, { ID } from './AppUserMenu';
import { Pressable } from 'react-native';

const UserMenuButton = () => {
    const { user } = useApi();

    const [ menuVisible, setMenuVisible ] = useState(false);

    const onUserButtonPress = useCallback(() => {
        setMenuVisible(true);
    }, []);

    const onUserMenuClose = useCallback(() => {
        setMenuVisible(false);
    }, []);

    return (
        <>
            <Tooltip title={translate('UserMenu')}>
                <Pressable 
                    onPress={onUserButtonPress}
                    style={{ padding: 0 }}
                >
                    <AppUserMenu
                        visible={menuVisible}
                        anchor={<UserAvatar user={user} />}
                        onMenuClose={onUserMenuClose}
                    />
                </Pressable>
            </Tooltip>


        </>
    );
};

export default UserMenuButton;
