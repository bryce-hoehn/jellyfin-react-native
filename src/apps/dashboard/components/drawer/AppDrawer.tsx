import { View } from 'react-native';
import React, { FC } from 'react';

import DrawerHeaderLink from 'apps/experimental/components/drawers/DrawerHeaderLink';
import ResponsiveDrawer, { ResponsiveDrawerProps } from 'components/ResponsiveDrawer';

import ServerDrawerSection from './sections/ServerDrawerSection';
import DevicesDrawerSection from './sections/DevicesDrawerSection';
import LiveTvDrawerSection from './sections/LiveTvDrawerSection';
import AdvancedDrawerSection from './sections/AdvancedDrawerSection';
import PluginDrawerSection from './sections/PluginDrawerSection';

const AppDrawer: FC<ResponsiveDrawerProps> = ({
    open = false,
    onClose,
    onOpen
}) => (
    <ResponsiveDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
    >
        {/* TODO: List styling - was MUI List with disablePadding */}
        <View>
            {/* TODO: ListItem styling - was MUI ListItem with disablePadding */}
            <View>
                <DrawerHeaderLink />
            </View>
        </View>
        <ServerDrawerSection />
        <DevicesDrawerSection />
        <LiveTvDrawerSection />
        <PluginDrawerSection />
        <AdvancedDrawerSection />
    </ResponsiveDrawer>
);

export default AppDrawer;
