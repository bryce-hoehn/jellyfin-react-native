import React, { type FC, type PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import useTextLines from './useTextLines';

import type { ItemDto } from 'types/base/models/item-dto';
import type { TextLine, TextLineOpts } from './types';

interface TextWrapperProps {
    isHeading?: boolean;
    isLargeStyle?: boolean;
    className?: string;
}

const TextWrapper: FC<PropsWithChildren<TextWrapperProps>> = ({
    isHeading,
    isLargeStyle,
    className,
    children
}) => {
    if (isHeading) {
        return (
            <Text className={classNames('primary', className)} variant={isLargeStyle ? 'headlineLarge' : 'headlineMedium'}>
                {children}
            </Text>
        );
    } else {
        return (
            <View className={classNames('secondary', className )}>
                {children}
            </View>
        );
    }
};

interface TextLinesProps {
    item: ItemDto;
    textLineOpts?: TextLineOpts;
    isLargeStyle?: boolean;
    className?: string;
    textClassName?: string;
}

const TextLines: FC<TextLinesProps> = ({
    item,
    textLineOpts,
    isLargeStyle,
    className,
    textClassName
}) => {
    const { textLines } = useTextLines({ item, textLineOpts });

    const renderTextlines = (text: TextLine, index: number) => {
        return (
            <TextWrapper
                key={index}
                isHeading={index === 0}
                isLargeStyle={isLargeStyle}
                className={textClassName}
            >
                <bdi>{text.title}</bdi>
            </TextWrapper>
        );
    };

    return (
        <View className={className}>
            {textLines?.map((text, index) => renderTextlines(text, index))}
        </View>
    );
};

export default TextLines;
