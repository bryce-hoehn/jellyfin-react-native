import classNames from 'classnames';
import React, { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { ItemAction } from 'constants/itemAction';
import type { DataAttributes } from 'types/dataAttributes';

import layoutManager from '../../layoutManager';

interface ListWrapperProps {
    index: number | undefined;
    title?: string | null;
    action?: ItemAction | null;
    dataAttributes?: DataAttributes;
    className?: string;
}

const ListWrapper: FC<PropsWithChildren<ListWrapperProps>> = ({
    index,
    action,
    title,
    className,
    dataAttributes,
    children
}) => {
    if (layoutManager.tv) {
        return (
            <Button
                // TODO: data-* attributes not supported in React Native
                // data-index={index}
                className={classNames(
                    className,
                    'itemAction listItem-button listItem-focusscale'
                )}
                // data-action={action}
                // TODO: aria-label not supported in React Native Paper Button
                // aria-label={title || ''}
                {...dataAttributes}
            >
                {children}
            </Button>
        );
    } else {
        return (
            <View 
                // TODO: data-* attributes not supported in React Native
                // data-index={index}
                className={className} {...dataAttributes}>
                {children}
            </View>
        );
    }
};

export default ListWrapper;
