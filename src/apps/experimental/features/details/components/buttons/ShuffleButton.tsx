import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import type { ItemDto } from 'types/base/models/item-dto';

interface ShuffleButtonProps {
    item: ItemDto;
}

const ShuffleButton: FC<ShuffleButtonProps> = ({ item }) => {
    const shuffle = useCallback(() => {
        playbackManager.shuffle(item);
    }, [item]);

    return (
        <IconButton
            // TODO: title prop not supported - use accessibility label
            // TODO: className prop not supported in RN Paper
            onPress={shuffle}
            icon={() => <Icon name="shuffle" size={24} />}
        />
    );
};

export default ShuffleButton;
