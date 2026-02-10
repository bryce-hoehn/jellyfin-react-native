import { useMediaQuery, Theme } from 'hooks/useMediaQuery';
import React, { FC, StrictMode, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import { Slot } from 'expo-router';

import AppBody from 'components/AppBody';
import AppToolbar from 'components/toolbar/AppToolbar';
import ServerButton from 'components/toolbar/ServerButton';
import ElevationScroll from 'components/ElevationScroll';
import { DRAWER_WIDTH } from 'components/ResponsiveDrawer';
import { appRouter } from 'components/router/appRouter';
import { useApi } from 'hooks/useApi';
import { useLocale } from 'hooks/useLocale';

import AppTabs from './components/AppTabs';
import AppDrawer from './components/drawer/AppDrawer';
import HelpButton from './components/toolbar/HelpButton';
import { DASHBOARD_APP_PATHS } from './routes/routes';

import { View } from 'react-native';

export const Component: FC = () => {
    const [ isDrawerActive, setIsDrawerActive ] = useState(false);
    const pathname = usePathname();
    const { user } = useApi();
    const { dateFnsLocale } = useLocale();

    const isMediumScreen = useMediaQuery((t: any) => t.breakpoints.up('md'));
    const isMetadataManager = pathname.startsWith(`/${DASHBOARD_APP_PATHS.MetadataManager}`);
    const isDrawerAvailable = Boolean(user) && !isMetadataManager;
    const isDrawerOpen = isDrawerActive && isDrawerAvailable;

    const onToggleDrawer = useCallback(() => {
        setIsDrawerActive(!isDrawerActive);
    }, [ isDrawerActive, setIsDrawerActive ]);

    // Update body class
    useEffect(() => {
        document.body.classList.add('dashboardDocument');

        return () => {
            document.body.classList.remove('dashboardDocument');
        };
    }, []);

    return (
            <View>
                <StrictMode>
                    <ElevationScroll elevate={false}>
                        <AppToolbar
                            isBackButtonAvailable={appRouter.canGoBack()}
                            isDrawerAvailable={!isMediumScreen && isDrawerAvailable}
                            isDrawerOpen={isDrawerOpen}
                            onDrawerButtonPress={onToggleDrawer}
                            buttons={
                                <HelpButton />
                            }
                        >
                            {isMetadataManager && (
                                <ServerButton />
                            )}

                            <AppTabs isDrawerOpen={isDrawerOpen} />
                        </AppToolbar>
                    </ElevationScroll>

                    {
                        isDrawerAvailable && (
                            <AppDrawer
                                open={isDrawerOpen}
                                onClose={onToggleDrawer}
                                onOpen={onToggleDrawer}
                            />
                        )
                    }
                </StrictMode>

                <View
                    style={{
                        width: '100%',
                        flexGrow: 1
                    }}
                >
                    <AppBody>
                        <Slot />
                    </AppBody>
                </View>
            </View>
    );
};
