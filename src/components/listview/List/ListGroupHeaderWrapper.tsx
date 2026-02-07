import React, { type FC, type PropsWithChildren } from 'react';
import { Text } from 'react-native-paper';

interface ListGroupHeaderWrapperProps {
    index?: number;
}

const ListGroupHeaderWrapper: FC<PropsWithChildren<ListGroupHeaderWrapperProps>> = ({
    index,
    children
}) => {
    if (index === 0) {
        return (
            <Text
                className='listGroupHeader listGroupHeader-first'
                variant='headlineMedium'
            >
                {children}
            </Text>
        );
    } else {
        return (
            <Text className='listGroupHeader' variant='headlineMedium'>
                {children}
            </Text>
        );
    }
};

export default ListGroupHeaderWrapper;
