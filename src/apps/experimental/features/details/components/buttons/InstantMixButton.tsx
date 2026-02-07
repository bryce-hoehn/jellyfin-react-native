import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import type { ItemDto } from 'types/base/models/item-dto';

interface InstantMixButtonProps {
    item?: ItemDto;
}

const InstantMixButton: FC<InstantMixButtonProps> = ({ item }) => {
    const onInstantMixClick = useCallback(() => {
        playbackManager.instantMix(item);
    }, [item]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={onInstantMixClick}
            icon={() => <Icon name="explore" size={24} />}
        />
    );
};

export default InstantMixButton;
