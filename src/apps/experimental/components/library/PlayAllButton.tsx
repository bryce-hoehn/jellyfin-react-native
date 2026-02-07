import React, { FC, useCallback } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { playbackManager } from 'components/playback/playbackmanager';
import { translate } from 'lib/globalize';
import { getFiltersQuery } from 'utils/items';
import { LibraryViewSettings } from 'types/library';
import { LibraryTab } from 'types/libraryTab';
import type { ItemDto } from 'types/base/models/item-dto';

interface PlayAllButtonProps {
    item: ItemDto | undefined
    items: ItemDto[]
    viewType: LibraryTab
    hasFilters: boolean
    isTextVisible: boolean
    libraryViewSettings: LibraryViewSettings
}

const PlayAllButton: FC<PlayAllButtonProps> = ({
    item,
    items,
    viewType,
    hasFilters,
    isTextVisible,
    libraryViewSettings
}) => {
    const play = useCallback(() => {
        if (item && !hasFilters) {
            playbackManager.play({
                items: [item],
                autoplay: true,
                queryOptions: {
                    SortBy: [libraryViewSettings.SortBy],
                    SortOrder: [libraryViewSettings.SortOrder]
                }
            }).catch(err => {
                console.error('[PlayAllButton] failed to play', err);
            });
        } else {
            playbackManager.play({
                items,
                autoplay: true,
                queryOptions: {
                    ParentId: item?.Id ?? undefined,
                    ...getFiltersQuery(viewType, libraryViewSettings),
                    SortBy: [libraryViewSettings.SortBy],
                    SortOrder: [libraryViewSettings.SortOrder]
                }
            }).catch(err => {
                console.error('[PlayAllButton] failed to play', err);
            });
        }
    }, [hasFilters, item, items, libraryViewSettings, viewType]);

    return (
        <Button
            // TODO: title prop not supported - use tooltip or accessibility label
            // TODO: startIcon not directly supported in RN Paper Button - use icon prop or custom layout
            onPress={play}
        >
            {isTextVisible ? (
                translate('HeaderPlayAll')
            ) : (
                <Icon name="play-arrow" size={24} />
            )}
        </Button>
    );
};

export default PlayAllButton;
