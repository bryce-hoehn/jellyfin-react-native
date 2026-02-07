import React, { type FC } from 'react';
import classNames from 'classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

interface CaptionMediaInfoProps {
    className?: string;
}

const CaptionMediaInfo: FC<CaptionMediaInfoProps> = ({ className }) => {
    const cssClass = classNames(
        'mediaInfoItem',
        'closedCaptionMediaInfoText',
        className
    );

    return (
        <View className={cssClass}>
            <Icon name="closed-caption" size={24} />
        </View>
    );
};

export default CaptionMediaInfo;
