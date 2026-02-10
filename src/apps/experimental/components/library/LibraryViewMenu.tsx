
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button/Button';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import React, { FC, useCallback, useState } from 'react';
import { usePathname, useRouter, useLocalSearchParams } from 'expo-router';

import { LibraryRoutes } from 'apps/experimental/features/libraries/constants/libraryRoutes';
import useCurrentTab from 'hooks/useCurrentTab';
import { translate } from 'lib/globalize';

const LIBRARY_VIEW_MENU_ID = 'library-view-menu';

const LibraryViewMenu: FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useLocalSearchParams();
    const { activeTab } = useCurrentTab();

    const [ menuAnchorEl, setMenuAnchorEl ] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const onMenuButtonPress = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    }, []);

    const onMenuClose = useCallback(() => {
        setMenuAnchorEl(null);
    }, []);

    const currentRoute = LibraryRoutes.find(({ path }) => path === pathname);
    const currentTab = currentRoute?.views.find(({ index }) => index === activeTab);

    if (!currentTab) return null;

    return (
        <>
            <Button
                variant='text'
                size='large'
                color='inherit'
                endIcon={<ArrowDropDown />}
                aria-controls={LIBRARY_VIEW_MENU_ID}
                aria-haspopup='true'
                onPress={onMenuButtonPress}
            >
                {translate(currentTab.label)}
            </Button>

            <Menu
                anchorEl={menuAnchorEl}
                id={LIBRARY_VIEW_MENU_ID}
                keepMounted
                open={isMenuOpen}
                onClose={onMenuClose}
            >
                {currentRoute?.views.map(tab => (
                    <MenuItem
                        key={tab.view}
                        // eslint-disable-next-line react/jsx-no-bind
                        onPress={() => {
                            const newParams = new URLSearchParams(searchParams as Record<string, string>);
                            newParams.set('tab', `${tab.index}`);
                            router.push(`${pathname}?${newParams.toString()}`);
                            onMenuClose();
                        }}
                        selected={tab.index === currentTab.index}
                    >
                        {translate(tab.label)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LibraryViewMenu;
