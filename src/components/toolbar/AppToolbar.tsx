import { Appbar, Tooltip } from 'react-native-paper';
import React, { type FC, type PropsWithChildren, ReactNode } from 'react';

import { appRouter } from 'components/router/appRouter';
import { useApi } from 'hooks/useApi';
import { translate } from 'lib/globalize'

import UserMenuButton from './UserMenuButton';
import { View } from 'react-native';
import { fontSizes } from 'constants/sizes';

interface AppToolbarProps {
    buttons?: ReactNode
    isDrawerAvailable: boolean
    isDrawerOpen: boolean
    onDrawerButtonPress?: () => void
    isBackButtonAvailable?: boolean
    isUserMenuAvailable?: boolean
}

const onBackButtonPress = () => {
    appRouter.back()
        .catch(err => {
            console.error('[AppToolbar] error calling appRouter.back', err);
        });
}; // TODO: Fix routing

const AppToolbar: FC<PropsWithChildren<AppToolbarProps>> = ({
    buttons,
    children,
    isDrawerAvailable,
    isDrawerOpen,
    onDrawerButtonPress = () => { /* no-op */ },
    isBackButtonAvailable = false,
    isUserMenuAvailable = true
}) => {
    const { user } = useApi();
    const isUserLoggedIn = Boolean(user);

    return (
        <Appbar.Header>
            {isUserLoggedIn && isDrawerAvailable && (
                <Tooltip title={translate(isDrawerOpen ? 'MenuClose' : 'MenuOpen')}>
                    <Appbar.Action
                        icon="menu"
                        size={fontSizes.large}
                        // edge='start'
                        color='inherit'
                        aria-label={translate(isDrawerOpen ? 'MenuClose' : 'MenuOpen')}
                        onPress={onDrawerButtonPress}
                    />
                </Tooltip>
            )}

            {isBackButtonAvailable && (
                <Tooltip title={translate('ButtonBack')}>
                    <Appbar.Action
                        icon="arrow-back"
                        size={fontSizes.large}
                        // Set the edge if the drawer button is not shown
                        // edge={!(isUserLoggedIn && isDrawerAvailable) ? 'start' : undefined} // FIX
                        color='inherit'
                        aria-label={translate('ButtonBack')}
                        onPress={onBackButtonPress}
                    />
                </Tooltip>
            )}

            {children}

            <View style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                {buttons}
            </View>

            {isUserLoggedIn && isUserMenuAvailable && (
                <View style={{ flexGrow: 0 }}>
                    <UserMenuButton />
                </View>
            )}
        </Appbar.Header>
    );
};

export default AppToolbar;
