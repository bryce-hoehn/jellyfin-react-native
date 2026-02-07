import React, { useMemo } from 'react';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import { View } from 'react-native';
import ActivityListItem from 'apps/dashboard/features/activity/components/ActivityListItem';
import { useLogEntries } from 'apps/dashboard/features/activity/api/useLogEntries';
import subSeconds from 'date-fns/subSeconds';
import { Text } from 'react-native-paper';

const ActivityLogWidget = () => {
    const dayBefore = useMemo(() => (
        subSeconds(new Date(), 24 * 60 * 60).toISOString()
    ), []);

    const { data: logs, isPending } = useLogEntries({
        startIndex: 0,
        limit: 7,
        minDate: dayBefore,
        hasUserId: true
    });

    return (
        <Widget
            title={translate('HeaderActivity')}
            href='/dashboard/activity?useractivity=true'
        >
            {/* TODO: Replace Stack with View and custom layout */}
            {/* TODO: Replace Skeleton with ActivityIndicator or custom skeleton */}
            {/* TODO: Replace List with View and custom styling */}
            {/* TODO: Replace sx prop with StyleSheet */}
            {isPending ? (
                <View>
                    <Text>Loading...</Text>
                    <Text>Loading...</Text>
                    <Text>Loading...</Text>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <View>
                    {logs?.Items?.map(entry => (
                        <ActivityListItem
                            key={entry.Id}
                            item={entry}
                            displayShortOverview={true}
                            to='/dashboard/activity?useractivity=true'
                        />
                    ))}
                </View>
            )}
        </Widget>
    );
};

export default ActivityLogWidget;
