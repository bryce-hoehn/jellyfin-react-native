import React, { type FC } from 'react';
import classNames from 'classnames';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import mediainfo from './mediainfo';

interface EndsAtProps {
    className?: string;
    runTimeTicks: number;
    positionTicks?: number;
}

const EndsAt: FC<EndsAtProps> = ({ runTimeTicks, positionTicks, className }) => {
    const cssClass = classNames(
        'mediaInfoItem',
        'endsAt',
        className
    );

    const displayTime = mediainfo.getEndsAtFromPosition(runTimeTicks, positionTicks, 1, true);

    return (
        <View className={cssClass}>
            <Text>{displayTime}</Text>
        </View>
    );
};

export default EndsAt;
