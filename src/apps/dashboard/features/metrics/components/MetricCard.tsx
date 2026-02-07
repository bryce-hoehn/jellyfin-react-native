import { View, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-paper';
import React, { type FC, type ComponentType } from 'react';

import { useLocale } from 'hooks/useLocale';
import { toDecimalString } from 'utils/number';

interface Metric {
    label: string
    value?: number
}

// TODO: Update Icon type from MUI SvgIcon to react-native-vector-icons component type
export interface MetricCardProps {
    metrics: Metric[]
    Icon: ComponentType<{ size?: number; color?: string }>
}

const MetricCard: FC<MetricCardProps> = ({
    metrics,
    Icon
}) => {
    const { dateTimeLocale } = useLocale();

    // TODO: Replace Card sx prop with React Native StyleSheet
    // TODO: Replace Stack with View and add flexbox styling (direction='row', justifyContent, alignItems, padding)
    return (
        <Card>
            <View>
                {metrics.map(({ label, value }) => (
                    <View key={label}>
                        <Text variant='bodyMedium'>
                            {label}
                        </Text>
                        <Text variant='headlineSmall'>
                            {typeof value !== 'undefined' ? (
                                toDecimalString(value, dateTimeLocale)
                            ) : (
                                <ActivityIndicator />
                            )}
                        </Text>
                    </View>
                ))}
                <Icon />
            </View>
        </Card>
    );
};

export default MetricCard;
