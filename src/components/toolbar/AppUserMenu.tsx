import { MenuProps, Menu, List, Divider } from 'react-native-paper';
import React, { FC, useCallback } from 'react';
import { Link } from 'expo-router';

import { appHost } from 'components/apphost';
import { AppFeature } from 'constants/appFeature';
import { useApi } from 'hooks/useApi';
import { useQuickConnectEnabled } from 'hooks/useQuickConnect';
import { translate } from 'lib/globalize';
import shell from 'scripts/shell';
import Dashboard from 'utils/dashboard';

export const ID = 'app-user-menu';

interface AppUserMenuProps {
    visible: boolean
    anchor: React.ReactNode
    onMenuClose: () => void
}

const AppUserMenu: FC<AppUserMenuProps> = ({
    anchor,
    visible,
    onMenuClose
}) => {
    const { user } = useApi();
    const { data: isQuickConnectEnabled } = useQuickConnectEnabled();

    const onDownloadManagerClick = useCallback(() => {
        shell.openDownloadManager();
        onMenuClose();
    }, [ onMenuClose ]);

    const onClientSettingsClick = useCallback(() => {
        shell.openClientSettings();
        onMenuClose();
    }, [ onMenuClose ]);

    const onExitAppClick = useCallback(() => {
        appHost.exit();
        onMenuClose();
    }, [ onMenuClose ]);

    const onLogoutClick = useCallback(() => {
        Dashboard.logout();
        onMenuClose();
    }, [ onMenuClose ]);

    const onSelectServerClick = useCallback(() => {
        Dashboard.selectServer();
        onMenuClose();
    }, [ onMenuClose ]);

    // TODO: Fix routing
    return (
        <Menu
            anchor={anchor}
            anchorPosition="bottom"
            visible={visible}
            onDismiss={onMenuClose}
        >
            <Menu.Item
                component={Link}
                href={`/userprofile?userId=${user?.Id}`}
                onPress={onMenuClose}
            >
                <List.Item
                    title={translate('Profile')}
                    left={props => <List.Icon {...props} icon="account-circle" />}
                />
            </Menu.Item>
            <Menu.Item
                component={Link}
                href='/mypreferencesmenu'
                onPress={onMenuClose}
            >
                <List.Item
                    title={translate('Settings')}
                    left={props => <List.Icon {...props} icon="settings" />}
                />
            </Menu.Item>

            {(appHost.supports(AppFeature.DownloadManagement) || appHost.supports(AppFeature.ClientSettings)) && (
                <Divider />
            )}

            {appHost.supports(AppFeature.DownloadManagement) && (
                <Menu.Item
                    onPress={onDownloadManagerClick}
                >
                    <List.Item
                        title={translate('DownloadManager')}
                        left={props => <List.Icon {...props} icon="download" />}
                    />
                </Menu.Item>
            )}

            {appHost.supports(AppFeature.ClientSettings) && (
                <Menu.Item
                    onPress={onClientSettingsClick}
                >
                    <List.Item
                        title={translate('ClientSettings')}
                        left={props => <List.Icon {...props} icon="app-settings-alt" />}
                    />
                </Menu.Item>
            )}

            {/* ADMIN LINKS */}
            {user?.Policy?.IsAdministrator && ([
                <Divider key='admin-links-divider' />,
                <Menu.Item
                    key='admin-dashboard-link'
                    component={Link}
                    href='/dashboard'
                    onPress={onMenuClose}
                >
                    <List.Item
                        title={translate('TabDashboard')}
                        left={props => <List.Icon {...props} icon="dashboard" />}
                    />
                </Menu.Item>,
                <Menu.Item
                    key='admin-metadata-link'
                    component={Link}
                    href='/metadata'
                    onPress={onMenuClose}
                >
                    <List.Item
                        title={translate('MetadataManager')}
                        left={props => <List.Icon {...props} icon="edit" />}
                    />
                </Menu.Item>
            ])}

            <Divider />
            {isQuickConnectEnabled && (
                <Menu.Item
                    component={Link}
                    href='/quickconnect'
                    onPress={onMenuClose}
                >
                    <List.Item
                        title={translate('QuickConnect')}
                        left={props => <List.Icon {...props} icon="phonelinklock" />}
                    />
                </Menu.Item>
            )}

            {appHost.supports(AppFeature.MultiServer) && (
                <Menu.Item
                    onPress={onSelectServerClick}
                >
                    <List.Item
                        title={translate('SelectServer')}
                        left={props => <List.Icon {...props} icon="storage" />}
                    />
                </Menu.Item>
            )}

            <Menu.Item
                onPress={onLogoutClick}
            >
                <List.Item
                    title={translate('ButtonSignOut')}
                    left={props => <List.Icon {...props} icon="logout" />}
                />
            </Menu.Item>

            {appHost.supports(AppFeature.ExitMenu) && ([
                <Divider key='exit-menu-divider' />,
                <Menu.Item
                    key='exit-menu-button'
                    onPress={onExitAppClick}
                >
                    <List.Item
                        title={translate('ButtonExitApp')}
                        left={props => <List.Icon {...props} icon="close" />}
                    />
                </Menu.Item>
            ])}
        </Menu>
    );
};

export default AppUserMenu;
