import React, { type FC } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ItemAction } from 'constants/itemAction';
import { translate } from 'lib/globalize';

interface PlayArrowIconButtonProps {
    className: string;
    action: ItemAction;
    title: string;
    iconClassName?: string;
}

const PlayArrowIconButton: FC<PlayArrowIconButtonProps> = ({ className, action, title, iconClassName }) => {
    return (
        <IconButton
            // TODO: className prop not supported in RN Paper - need style prop instead
            // data-action attribute not supported in React Native
            icon={({ size, color }) => <Icon name="play-arrow" size={size} color={color} />}
            // TODO: title prop not directly supported - need Tooltip or accessible label
        />
    );
};

export default PlayArrowIconButton;
