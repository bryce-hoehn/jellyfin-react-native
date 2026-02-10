import React from 'react';
import { View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDefaultBackgroundClass } from 'components/cardbuilder/cardBuilderUtils';
import { Link, Href } from 'expo-router';

// TODO: CardMedia - React Native Paper doesn't have a direct CardMedia equivalent
// Need to use React Native Image component or similar
// TODO: CardActionArea - React Native Paper doesn't have a CardActionArea equivalent
// May need to use Pressable or TouchableOpacity with Card

interface BaseCardProps {
    title?: string;
    text?: string;
    image?: string | null;
    icon?: React.ReactNode;
    to?: Href;
    onPress?: () => void;
    action?: boolean;
    actionRef?: React.MutableRefObject<HTMLButtonElement | null>;
    onActionPress?: () => void;
    height?: number;
    width?: number;
};

const BaseCard = ({
    title,
    text,
    image,
    icon,
    to,
    onPress,
    action,
    actionRef,
    onActionPress,
    height,
    width
}: BaseCardProps) => {
    return (
        <Card
            // TODO: Remove sx prop - convert to React Native StyleSheet or style prop
            // Original: display: 'flex', flexDirection: 'column', height: height || 240, width: width
        >
            {/* TODO: CardActionArea replacement needed - use Pressable or TouchableOpacity */}
            {/* Original props: component Link, to, onPress */}
            <View
                // TODO: Convert sx styling to React Native style prop
                // Original: display: 'flex', flexGrow: 1, alignItems: 'stretch'
            >
                {image ? (
                    // TODO: CardMedia replacement - use React Native Image component
                    // Original props: image={image}, title={title}, flexGrow: 1
                    <View>
                        {/* TODO: Implement Image component here */}
                    </View>
                ) : (
                    <View
                        // TODO: Remove className prop - React Native View doesn't support className
                        // Original: className={getDefaultBackgroundClass(title)}
                        // TODO: Convert sx to React Native style prop
                        // Original sx: flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    >
                        {icon}
                    </View>
                )}
            </View>
            <Card.Content
                // TODO: Remove sx prop - convert to React Native style
                // Original: minHeight: 50, '&:last-child': { paddingBottom: 2, paddingRight: 1 }
            >
                <View
                    // TODO: Convert Stack to View with flexDirection: 'row' style
                    // Original: flexGrow={1} direction='row'
                >
                    <View
                        // TODO: Convert Stack to View with flex: 1 style
                        // Original: flexGrow={1} sx={{ overflow: 'hidden' }}
                    >
                        <Text
                            // TODO: Remove sx prop - convert to React Native style
                            // Original gutterBottom sx: overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
                            // Text doesn't support ellipsizeMode directly, may need numberOfLines
                        >
                            {title}
                        </Text>
                        {text && (
                            <Text
                                // TODO: Convert Typography variant='body2' to appropriate Text style
                                // TODO: Convert color='text.secondary' to theme color
                                // TODO: Remove sx prop - convert lineBreak: 'anywhere' to React Native equivalent
                            >
                                {text}
                            </Text>
                        )}
                    </View>
                    <View>
                        {action ? (
                            <IconButton
                                ref={actionRef}
                                onPress={onActionPress}
                                icon={() => <Icon name="more-vert" size={24} />}
                            >
                            </IconButton>
                        ) : null}
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default BaseCard;
