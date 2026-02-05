import React, { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import ExploreIcon from '@mui/icons-material/Explore';

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
            className='button-flat btnInstantMix'
            title={translate('HeaderInstantMix')}
            onPress={onInstantMixClick}
        >
            <ExploreIcon />
        </IconButton>
    );
};

export default InstantMixButton;
