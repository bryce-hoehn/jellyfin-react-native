import { ItemSortBy } from '@jellyfin/sdk/lib/generated-client/models/item-sort-by';
import React, { FC, useCallback } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import { getFiltersQuery } from 'utils/items';
import { LibraryViewSettings } from 'types/library';
import { LibraryTab } from 'types/libraryTab';
import type { ItemDto } from 'types/base/models/item-dto';

interface ShuffleButtonProps {
    item: ItemDto | undefined
    items: ItemDto[]
    viewType: LibraryTab
    hasFilters: boolean
    isTextVisible: boolean
    libraryViewSettings: LibraryViewSettings
}

const ShuffleButton: FC<ShuffleButtonProps> = ({
    item,
    items,
    viewType,
    hasFilters,
    isTextVisible,
    libraryViewSettings
}) => {
    const shuffle = useCallback(() => {
        if (item && !hasFilters) {
            playbackManager.shuffle(item);
        } else {
            playbackManager.play({
                items,
                autoplay: true,
                queryOptions: {
                    ParentId: item?.Id ?? undefined,
                    ...getFiltersQuery(viewType, libraryViewSettings),
                    SortBy: [ItemSortBy.Random]
                }
            }).catch(err => {
                console.error('[ShuffleButton] failed to play', err);
            });
        }
    }, [hasFilters, item, items, libraryViewSettings, viewType]);

    return (
        <Button
            // TODO: title prop not supported - use tooltip or accessibility label
            // TODO: startIcon not directly supported in RN Paper Button - use icon prop or custom layout
            onPress={shuffle}
        >
            {isTextVisible ? (
                translate('Shuffle')
            ) : (
                <Icon name="shuffle" size={24} />
            )}
        </Button>
    );
};

export default ShuffleButton;
