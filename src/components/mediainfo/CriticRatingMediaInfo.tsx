import React, { type FC } from 'react';
import classNames from 'classnames';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface CriticRatingMediaInfoProps {
    className?: string;
    criticRating: number;
}

const CriticRatingMediaInfo: FC<CriticRatingMediaInfoProps> = ({
    className,
    criticRating
}) => {
    const cssClass = classNames(
        'mediaInfoCriticRating',
        'mediaInfoItem',
        criticRating >= 60 ?
            'mediaInfoCriticRatingFresh' :
            'mediaInfoCriticRatingRotten',
        className
    );
    return <View className={cssClass}><Text>{criticRating}</Text></View>;
};

export default CriticRatingMediaInfo;
