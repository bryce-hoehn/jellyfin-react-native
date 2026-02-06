import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import { Drawer } from 'react-native-paper';
import React, { type FC, type PropsWithChildren } from 'react';

import browser from 'scripts/browser';

export const DRAWER_WIDTH = 240;

export interface ResponsiveDrawerProps {
    open: boolean
    onClose: () => void
    onOpen: () => void
}

// TODO: React Native Paper Drawer works differently than MUI Drawer
// TODO: useMediaQuery doesn't exist - use useWindowDimensions instead
// TODO: SwipeableDrawer not available - RN Paper Drawer doesn't have swipe functionality built-in
const ResponsiveDrawer: FC<PropsWithChildren<ResponsiveDrawerProps>> = ({
    children,
    open = false,
    onClose,
    onOpen
}) => {
    const { width } = useWindowDimensions();
    const isMediumScreen = width >= 960; // md breakpoint approximation

    // TODO: React Native Paper doesn't have permanent/temporary drawer variants
    // TODO: This component needs major refactoring for proper RN drawer implementation
    // Consider using @react-navigation/drawer for better integration
    return ( isMediumScreen ? (
        /* DESKTOP DRAWER */
        <View
            style={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                paddingBottom: 67.2, // Padding for now playing bar (4.2rem ~= 67.2px)
            }}
        >
            {children}
        </View>
    ) : (
        /* MOBILE DRAWER */
        <Drawer.Section
            // TODO: RN Paper Drawer doesn't have swipeable functionality
            // TODO: open/onClose/onOpen props work differently
            // TODO: anchor, disableDiscovery, ModalProps don't exist
        >
            <View
                role='presentation'
                // TODO: onPress and onKeyDown work differently in React Native
            >
                {children}
            </View>
        </Drawer.Section>
    ));
};

export default ResponsiveDrawer;
