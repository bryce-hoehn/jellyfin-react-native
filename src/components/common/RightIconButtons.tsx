import React, { type FC } from 'react';
import { IconButton } from 'react-native-paper';

import { ItemAction } from 'constants/itemAction';

interface RightIconButtonsProps {
    className?: string;
    id: string;
    icon: string;
    title: string;
}

const RightIconButtons: FC<RightIconButtonsProps> = ({ className, id, title, icon }) => {
    return (
        <IconButton
            // TODO: className not supported in RN Paper - use style prop
            // TODO: data-action and data-customaction attributes not supported in React Native
            // TODO: title prop not directly supported - need accessible label
            icon={icon}
        />
    );
};

export default RightIconButtons;
