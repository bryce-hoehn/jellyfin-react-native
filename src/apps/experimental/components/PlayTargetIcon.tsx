import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import browser from 'scripts/browser';
import type { PlayTarget } from 'types/playTarget';

const PlayTargetIcon = ({ target }: { target: PlayTarget }) => {
    if (!target.deviceType && target.isLocalPlayer) {
        if (browser.tv) {
            return <Icon name="tv" size={24} />;
        } else if (browser.mobile) {
            return <Icon name="smartphone" size={24} />;
        }
        return <Icon name="computer" size={24} />;
    }

    switch (target.deviceType) {
        case 'smartphone':
            return <Icon name="smartphone" size={24} />;
        case 'tablet':
            return <Icon name="tablet" size={24} />;
        case 'desktop':
            return <Icon name="computer" size={24} />;
        case 'cast':
            return <Icon name="cast" size={24} />;
        case 'tv':
            return <Icon name="tv" size={24} />;
        default:
            return <Icon name="devices" size={24} />;
    }
};

export default PlayTargetIcon;
