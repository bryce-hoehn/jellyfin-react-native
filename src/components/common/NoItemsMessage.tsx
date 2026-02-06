import React, { type FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { translate } from 'lib/globalize';

interface NoItemsMessageProps {
    message?: string;
}

const NoItemsMessage: FC<NoItemsMessageProps> = ({
    message = 'MessageNoItemsAvailable'
}) => {
    return (
        <View className='noItemsMessage centerMessage'>
            <Text variant='headlineLarge'>
                {translate('MessageNothingHere')}
            </Text>
            <Text style={{ marginBottom: 16 }}>
                {translate(message)}
            </Text>
        </View>
    );
};

export default NoItemsMessage;
