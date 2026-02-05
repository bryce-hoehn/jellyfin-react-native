import React, { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';

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
            title={translate('Shuffle')}
            className='button-flat btnShuffle'
            onPress={shuffle}
        >
            <ShuffleIcon />
        </IconButton>
    );
};

export default ShuffleButton;
