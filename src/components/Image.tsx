import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Image as RNImage, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import React, { type FC } from 'react';

import { LoadingSkeleton } from './LoadingSkeleton';

// TODO: SvgIconComponent type not available in React Native
type IconComponent = React.ComponentType<any>;

interface ImageProps {
    isLoading: boolean
    alt?: string
    url?: string
    aspectRatio?: number
    FallbackIcon?: IconComponent
}

const Image: FC<ImageProps> = ({
    isLoading,
    alt,
    url,
    aspectRatio = 16 / 9,
    FallbackIcon = Icon
}) => (
    <Surface
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            aspectRatio,
            overflow: 'hidden'
        }}
    >
        <LoadingSkeleton
            isLoading={isLoading}
            variant='rectangular'
            width='100%'
            height='100%'
        >
            {url ? (
                <RNImage
                    source={{ uri: url }}
                    alt={alt}
                    style={{ flex: 1, width: '100%' }}
                    accessibilityLabel={alt}
                    resizeMode="cover"
                />
            ) : (
                <View
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {FallbackIcon && <Icon name="image-not-supported" size={100} />}
                </View>
            )}
        </LoadingSkeleton>
    </Surface>
);

export default Image;
