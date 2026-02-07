import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client';
import { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MetaView } from '../constants/metaView';

interface LibraryIconProps {
    item: BaseItemDto
}

const LibraryIcon: FC<LibraryIconProps> = ({
    item
}) => {
    if (item.Id === MetaView.Favorites.Id) {
        return <Icon name="favorite" size={24} />;
    }

    switch (item.CollectionType) {
        case CollectionType.Movies:
            return <Icon name="movie" size={24} />;
        case CollectionType.Music:
            return <Icon name="music-note" size={24} />;
        case CollectionType.Homevideos:
        case CollectionType.Photos:
            return <Icon name="photo" size={24} />;
        case CollectionType.Livetv:
            return <Icon name="live-tv" size={24} />;
        case CollectionType.Tvshows:
            return <Icon name="tv" size={24} />;
        case CollectionType.Trailers:
            return <Icon name="theaters" size={24} />;
        case CollectionType.Musicvideos:
            return <Icon name="music-video" size={24} />;
        case CollectionType.Books:
            return <Icon name="book" size={24} />;
        case CollectionType.Boxsets:
            return <Icon name="video-library" size={24} />;
        case CollectionType.Playlists:
            return <Icon name="queue" size={24} />;
        case undefined:
            return <Icon name="quiz" size={24} />;
        default:
            return <Icon name="folder" size={24} />;
    }
};

export default LibraryIcon;
