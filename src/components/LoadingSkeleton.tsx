// TODO: React Native Paper doesn't have a direct Skeleton component equivalent
// Consider using a third-party library like 'react-native-skeleton-placeholder' or 'react-content-loader'
import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';

// TODO: SkeletonProps not available - need custom type definition
interface LoadingSkeletonProps {
    isLoading: boolean;
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
    children,
    isLoading,
    width,
    height,
    variant,
    ...props
}) => (
    isLoading ? (
        // TODO: Replace with proper skeleton component when available
        <View style={{ width, height }}>
            <ActivityIndicator />
        </View>
    ) : (
        children
    )
);
