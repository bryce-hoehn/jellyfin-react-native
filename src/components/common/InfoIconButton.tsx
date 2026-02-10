import React, { type FC } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ItemAction } from 'constants/itemAction';
import { translate } from 'lib/globalize';

interface InfoIconButtonProps {
    className?: string;
}

const InfoIconButton: FC<InfoIconButtonProps> = ({ className }) => {
    return (
        <IconButton
            // TODO: className prop not supported in RN Paper - need style prop instead
            // TODO: data-action attribute not supported in React Native
            // TODO: title prop not directly supported - need accessible label
            icon={({ size, color }) => <Icon name="info" size={size} color={color} />}
        />
    );
};

export default InfoIconButton;
