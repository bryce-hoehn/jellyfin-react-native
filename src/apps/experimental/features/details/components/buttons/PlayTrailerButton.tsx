import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import type { ItemDto } from 'types/base/models/item-dto';

interface PlayTrailerButtonProps {
    item?: ItemDto;
}

const PlayTrailerButton: FC<PlayTrailerButtonProps> = ({ item }) => {
    const onPlayTrailerClick = useCallback(async () => {
        await playbackManager.playTrailers(item);
    }, [item]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={onPlayTrailerClick}
            icon={() => <Icon name="theaters" size={24} />}
        />
    );
};

export default PlayTrailerButton;
