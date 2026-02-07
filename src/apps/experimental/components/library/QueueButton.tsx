import React, { FC, useCallback } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import type { ItemDto } from 'types/base/models/item-dto';

interface QueueButtonProps {
    item: ItemDto | undefined
    items: ItemDto[]
    hasFilters: boolean
    isTextVisible: boolean
}

const QueueButton: FC<QueueButtonProps> = ({
    item,
    items,
    hasFilters,
    isTextVisible
}) => {
    const queue = useCallback(() => {
        if (item && !hasFilters) {
            playbackManager.queue({
                items: [item]
            }).catch(err => {
                console.error('[QueueButton] failed to add to queue', err);
            });
        } else {
            playbackManager.queue({
                items
            }).catch(err => {
                console.error('[QueueButton] failed to add to queue', err);
            });
        }
    }, [hasFilters, item, items]);

    return (
        <Button
            // TODO: title prop not supported - use tooltip or accessibility label
            // TODO: startIcon not directly supported in RN Paper Button - use icon prop or custom layout
            onPress={queue}
        >
            {isTextVisible ? (
                translate('AddToPlayQueue')
            ) : (
                <Icon name="queue" size={24} />
            )}
        </Button>
    );
};

export default QueueButton;
