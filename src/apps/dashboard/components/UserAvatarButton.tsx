import type { UserDto } from '@jellyfin/sdk/lib/generated-client/models/user-dto';
import { IconButton } from 'react-native-paper';
import React, { type FC } from 'react';

import UserAvatar from 'components/UserAvatar';

// TODO: size prop not available on React Native Paper IconButton (was 'large')
// TODO: color prop not available on React Native Paper IconButton (was 'inherit')
// TODO: sx prop not available in React Native Paper - use style prop with StyleSheet instead
// TODO: title prop not available in React Native Paper
// TODO: component={Link} navigation not available - need to implement navigation pattern with useNavigation hook

interface UserAvatarButtonProps {
    user?: UserDto
    onPress?: () => void
}

const UserAvatarButton: FC<UserAvatarButtonProps> = ({
    user,
    onPress
}) => (
    user?.Id ? (
        <IconButton
            icon={() => <UserAvatar user={user} />}
            onPress={onPress}
            style={{ padding: 0 }}
        />
    ) : undefined
);

export default UserAvatarButton;
