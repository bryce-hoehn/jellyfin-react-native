import { ApiClient } from 'jellyfin-apiclient';
import React, { type FC, useCallback, useEffect, useState } from 'react';
import Events, { Event } from 'utils/events';
import serverNotifications from 'scripts/serverNotifications';
import classNames from 'classnames';

import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { toPercentString } from 'utils/number';
import { getCurrentDateTimeLocale } from 'lib/globalize';
import type { ItemDto } from 'types/base/models/item-dto';

function CircularProgressWithLabel({ value }: { value: number }) {
    // TODO: Need to implement custom styling for View to replicate sx props
    return (
        <View style={{ position: 'relative' }}>
            {/* TODO: React Native ActivityIndicator doesn't support determinate progress - consider using react-native-progress library */}
            <ActivityIndicator size="large" />
            <View
                style={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text variant='labelSmall'>
                    {toPercentString(value / 100, getCurrentDateTimeLocale())}
                </Text>
            </View>
        </View>
    );
}

interface RefreshIndicatorProps {
    item: ItemDto;
    className?: string;
}

const RefreshIndicator: FC<RefreshIndicatorProps> = ({ item, className }) => {
    const [showProgressBar, setShowProgressBar] = useState(!!item.RefreshProgress);
    const [progress, setProgress] = useState(item.RefreshProgress || 0);

    const onRefreshProgress = useCallback((_e: Event, _apiClient: ApiClient, info: { ItemId: string | null | undefined; Progress: string; }) => {
        if (info.ItemId === item?.Id) {
            const pct = parseFloat(info.Progress);

            if (pct && pct < 100) {
                setShowProgressBar(true);
            } else {
                setShowProgressBar(false);
            }

            setProgress(pct);
        }
    }, [item?.Id]);

    const unbindEvents = useCallback(() => {
        Events.off(serverNotifications, 'RefreshProgress', onRefreshProgress);
    }, [onRefreshProgress]);

    const bindEvents = useCallback(() => {
        unbindEvents();

        if (item?.Id) {
            Events.on(serverNotifications, 'RefreshProgress', onRefreshProgress);
        }
    }, [item?.Id, onRefreshProgress, unbindEvents]);

    useEffect(() => {
        bindEvents();

        return () => {
            unbindEvents();
        };
    }, [bindEvents, item.Id, unbindEvents]);

    const progressringClass = classNames('progressring', className);

    return showProgressBar ? (
        <div className={progressringClass}>
            <CircularProgressWithLabel value={Math.floor(progress)} />
        </div>
    ) : null;
};

export default RefreshIndicator;
