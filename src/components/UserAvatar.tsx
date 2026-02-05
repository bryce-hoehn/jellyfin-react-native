import React, { type FC } from 'react';
import type { UserDto } from '@jellyfin/sdk/lib/generated-client/models/user-dto';
import { Avatar } from 'react-native-paper';

import { getImageApi } from '@jellyfin/sdk/lib/utils/api/image-api';
import { ImageType } from '@jellyfin/sdk/lib/generated-client/models/image-type';

import { useApi } from 'hooks/useApi';

interface UserAvatarProps {
    user?: UserDto
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
    const { api } = useApi();

    const imageUrl = api && user?.Id && user.PrimaryImageTag
        ? getImageApi(api).getItemImageUrlById(user.Id, ImageType.Primary, {
            tag: user.PrimaryImageTag
        })
        : undefined;

    return user ? (
        imageUrl ? (
            <Avatar.Image
                source={{ uri: imageUrl }}
                size={48}
            />
        ) : (
            <Avatar.Text
                label={user.Name ? user.Name.charAt(0).toUpperCase() : '?'}
                size={48}
            />
        )
    ) : null;
};

export default UserAvatar;