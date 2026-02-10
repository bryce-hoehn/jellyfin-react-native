import React, { type FC } from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import classNames from 'classnames';
import type { MiscInfo } from 'types/mediaInfoItem';

interface MediaInfoItemProps {
    className?: string;
    miscInfo: MiscInfo ;

}

const MediaInfoItem: FC<MediaInfoItemProps> = ({ className, miscInfo }) => {
    const { text, textAction, cssClass, type } = miscInfo;

    // eslint-disable-next-line sonarjs/function-return-type
    const renderText = () => {
        if (textAction) {
            return (
                <TouchableOpacity
                    className={classNames(textAction.cssClass, className)}
                    onPress={() => {
                        if (textAction.url) {
                            if (textAction.url.startsWith('http')) {
                                Linking.openURL(textAction.url);
                            }
                            // TODO: Handle internal navigation
                        }
                    }}
                    accessibilityLabel={textAction.title}
                >
                    <Text>
                        {textAction.title}
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return <Text>{text}</Text>;
        }
    };

    return (
        <View className={classNames('mediaInfoItem', cssClass, type, className)}>
            {renderText()}
        </View>
    );
};

export default MediaInfoItem;
