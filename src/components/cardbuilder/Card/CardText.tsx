import React, { type FC } from 'react';
import { View } from 'react-native';

import { ensureArray } from 'utils/array';

import type { TextLine } from './cardHelper';

interface CardTextProps {
    className?: string;
    textLine: TextLine;
}

const SEPARATOR = ' / ';

const CardText: FC<CardTextProps> = ({ className, textLine }) => {
    const { title, titleAction } = textLine;

    // TODO: href and data attributes not supported in React Native - need alternative
    // TODO: title attribute needs accessible label pattern
    return (
        <View className={className}>
            {titleAction ? (
                ensureArray(titleAction).map((action, i, arr) => (
                    <>
                        <a
                            className='itemAction textActionButton'
                            href={action.url}
                            title={action.title}
                            {...action.dataAttributes}
                        >
                            {action.title}
                        </a>
                        {/* If there are more items, add the separator */}
                        {(i < arr.length - 1) && SEPARATOR}
                    </>
                ))
            ) : (
                ensureArray(title).join(SEPARATOR)
            )}
        </View>
    );
};

export default CardText;
