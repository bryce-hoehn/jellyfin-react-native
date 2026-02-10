import Dashboard from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryAdd from '@mui/icons-material/LibraryAdd';
import Palette from '@mui/icons-material/Palette';
import People from '@mui/icons-material/People';
import PlayCircle from '@mui/icons-material/PlayCircle';
import Settings from '@mui/icons-material/Settings';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import React, { type MouseEvent, useCallback, useState } from 'react';
import { usePathname } from 'expo-router';

import ListItemLink from 'components/ListItemLink';
import { translate } from 'lib/globalize';

const LIBRARY_PATHS = [
    '/dashboard/libraries',
    '/dashboard/libraries/display',
    '/dashboard/libraries/metadata',
    '/dashboard/libraries/nfo'
];

const PLAYBACK_PATHS = [
    '/dashboard/playback/transcoding',
    '/dashboard/playback/resume',
    '/dashboard/playback/streaming',
    '/dashboard/playback/trickplay'
];

const ServerDrawerSection = () => {
    const pathname = usePathname();

    const [ isLibrarySectionOpen, setIsLibrarySectionOpen ] = useState(LIBRARY_PATHS.includes(pathname));
    const [ isPlaybackSectionOpen, setIsPlaybackSectionOpen ] = useState(PLAYBACK_PATHS.includes(pathname));

    const onLibrarySectionPress = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLibrarySectionOpen(isOpen => !isOpen);
    }, []);

    const onPlaybackSectionPress = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPlaybackSectionOpen(isOpen => !isOpen);
    }, []);

    return (
        <List
            aria-labelledby='server-subheader'
            subheader={
                <ListSubheader component='div' id='server-subheader'>
                    {translate('TabServer')}
                </ListSubheader>
            }
        >
            <ListItem disablePadding>
                <ListItemLink to='/dashboard'>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary={translate('TabDashboard')} />
                </ListItemLink>
            </ListItem>
            <ListItem disablePadding>
                <ListItemLink to='/dashboard/settings'>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary={translate('General')} />
                </ListItemLink>
            </ListItem>
            <ListItemLink to='/dashboard/branding'>
                <ListItemIcon>
                    <Palette />
                </ListItemIcon>
                <ListItemText primary={translate('HeaderBranding')} />
            </ListItemLink>
            <ListItem disablePadding>
                <ListItemLink to='/dashboard/users'>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary={translate('HeaderUsers')} />
                </ListItemLink>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onPress={onLibrarySectionPress}>
                    <ListItemIcon>
                        <LibraryAdd />
                    </ListItemIcon>
                    <ListItemText primary={translate('HeaderLibraries')} />
                    {isLibrarySectionOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={isLibrarySectionOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItemLink to='/dashboard/libraries' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('HeaderLibraries')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/libraries/display' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('Display')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/libraries/metadata' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('LabelMetadata')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/libraries/nfo' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('TabNfoSettings')} />
                    </ListItemLink>
                </List>
            </Collapse>
            <ListItem disablePadding>
                <ListItemButton onPress={onPlaybackSectionPress}>
                    <ListItemIcon>
                        <PlayCircle />
                    </ListItemIcon>
                    <ListItemText primary={translate('TitlePlayback')} />
                    {isPlaybackSectionOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={isPlaybackSectionOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItemLink to='/dashboard/playback/transcoding' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('Transcoding')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/playback/resume' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('ButtonResume')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/playback/streaming' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('TabStreaming')} />
                    </ListItemLink>
                    <ListItemLink to='/dashboard/playback/trickplay' sx={{ pl: 4 }}>
                        <ListItemText inset primary={translate('Trickplay')} />
                    </ListItemLink>
                </List>
            </Collapse>
        </List>
    );
};

export default ServerDrawerSection;
