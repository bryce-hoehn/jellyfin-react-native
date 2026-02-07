import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type WidgetProps = {
    title: string;
    href: string;
    children: React.ReactNode;
};

const Widget = ({ title, href, children }: WidgetProps) => {
    return (
        <View>
            {/* TODO: Replace component={RouterLink} and to={href} with navigation logic */}
            {/* TODO: Replace sx prop with StyleSheet */}
            {/* TODO: Replace endIcon prop with icon prop or custom implementation */}
            <Button
                mode='text'
            >
                <Text variant='headlineMedium'>
                    {title}
                </Text>
            </Button>

            {children}
        </View>
    );
};

export default Widget;
