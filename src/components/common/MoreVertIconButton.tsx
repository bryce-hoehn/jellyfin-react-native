import React, { type FC } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ItemAction } from 'constants/itemAction';
import { translate } from 'lib/globalize';

interface MoreVertIconButtonProps {
    className?: string;
    iconClassName?: string;
}

const MoreVertIconButton: FC<MoreVertIconButtonProps> = ({ className, iconClassName }) => {
    return (
        <IconButton
            // TODO: className and iconClassName props not supported in RN Paper - need style prop instead
            // TODO: data-action attribute not supported in React Native
            // TODO: title prop not directly supported - need accessible label
            icon={({ size, color }) => <Icon name="more-vert" size={size} color={color} />}
        />
    );
};

export default MoreVertIconButton;
