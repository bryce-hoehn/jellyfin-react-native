import type { ItemCounts } from '@jellyfin/sdk/lib/generated-client/models/item-counts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import React, { useMemo } from 'react';

import { useItemCounts } from 'apps/dashboard/features/metrics/api/useItemCounts';
import MetricCard, { type MetricCardProps } from 'apps/dashboard/features/metrics/components/MetricCard';
import { translate } from 'lib/globalize';

interface MetricDefinition {
    key: keyof ItemCounts
    i18n: string
}

interface CardDefinition {
    iconName: string
    metrics: MetricDefinition[]
}

const CARD_DEFINITIONS: CardDefinition[] = [
    {
        iconName: 'movie',
        metrics: [{ key: 'MovieCount', i18n: 'Movies' }]
    }, {
        iconName: 'tv',
        metrics: [
            { key: 'SeriesCount', i18n: 'Series' },
            { key: 'EpisodeCount', i18n: 'Episodes' }
        ]
    }, {
        iconName: 'music-note',
        metrics: [
            { key: 'AlbumCount', i18n: 'Albums' },
            { key: 'SongCount', i18n: 'Songs' }
        ]
    }, {
        iconName: 'music-video',
        metrics: [{ key: 'MusicVideoCount', i18n: 'MusicVideos' }]
    }, {
        iconName: 'book',
        metrics: [{ key: 'BookCount', i18n: 'Books' }]
    }, {
        iconName: 'video-library',
        metrics: [{ key: 'BoxSetCount', i18n: 'Collections' }]
    }
];

const ItemCountsWidget = () => {
    const {
        data: counts,
        isPending
    } = useItemCounts();

    const cards: MetricCardProps[] = useMemo(() => {
        return CARD_DEFINITIONS
            .filter(def => (
                // Include all cards while the request is pending
                isPending
                // Check if the metrics are present in counts
                || def.metrics.some(({ key }) => counts?.[key])
            ))
            .map(({ iconName, metrics }) => ({
                iconName,
                metrics: metrics.map(({ i18n, key }) => ({
                    label: translate(i18n),
                    value: counts?.[key]
                }))
            }));
    }, [ counts, isPending ]);

    return (
        <View>
            {/* TODO: Replace Grid with View and custom layout (flexWrap, flexDirection) */}
            {/* TODO: Replace sx prop with StyleSheet */}
            <View>
                {cards.map(card => (
                    <View
                        key={card.metrics.map(metric => metric.label).join('-')}
                    >
                        <MetricCard {...card} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ItemCountsWidget;
