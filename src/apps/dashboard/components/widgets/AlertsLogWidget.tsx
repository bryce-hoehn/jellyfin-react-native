import React, { useMemo } from 'react';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import { View } from 'react-native';
import ActivityListItem from 'apps/dashboard/features/activity/components/ActivityListItem';
import subSeconds from 'date-fns/subSeconds';
import { useLogEntries } from 'apps/dashboard/features/activity/api/useLogEntries';

const AlertsLogWidget = () => {
    const weekBefore = useMemo(() => (
        subSeconds(new Date(), 7 * 24 * 60 * 60).toISOString()
    ), []);

    const { data: alerts, isPending } = useLogEntries({
        startIndex: 0,
        limit: 4,
        minDate: weekBefore,
        hasUserId: false
    });

    if (isPending || alerts?.Items?.length === 0) return null;

    return (
        <Widget
            title={translate('Alerts')}
            href='/dashboard/activity?useractivity=false'
        >
            {/* TODO: Replace List with View and custom styling */}
            {/* TODO: Replace sx prop with StyleSheet */}
            <View>
                {alerts?.Items?.map(entry => (
                    <ActivityListItem
                        key={entry.Id}
                        item={entry}
                        displayShortOverview={false}
                        to='/dashboard/activity?useractivity=false'
                    />
                ))}
            </View>
        </Widget>
    );
};

export default AlertsLogWidget;
