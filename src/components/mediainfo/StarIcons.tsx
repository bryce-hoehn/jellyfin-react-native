import React, { type FC } from 'react';
import classNames from 'classnames';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface StarIconsProps {
    className?: string;
    communityRating: number;
}

const StarIcons: FC<StarIconsProps> = ({ className, communityRating }) => {
    const theme = useTheme();
    const cssClass = classNames(
        'mediaInfoItem',
        'starRatingContainer',
        className
    );

    return (
        <View className={cssClass} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
                name="star"
                size={20}
                // TODO: theme.vars.palette doesn't exist in RN Paper - use theme.colors
                color={theme.colors.primary}
            />
            <Text>{communityRating.toFixed(1)}</Text>
        </View>
    );
};

export default StarIcons;
