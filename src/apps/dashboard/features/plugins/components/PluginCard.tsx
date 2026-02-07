import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import BaseCard from 'apps/dashboard/components/BaseCard';

import { PluginDetails } from '../types/PluginDetails';

interface PluginCardProps {
    plugin: PluginDetails;
};

const PluginCard = ({ plugin }: PluginCardProps) => {
    const location = useLocation();

    const pluginPage = useMemo(() => (
        {
            pathname: `/dashboard/plugins/${plugin.id}`,
            search: `?name=${encodeURIComponent(plugin.name || '')}`,
            hash: location.hash
        }
    ), [ location, plugin ]);

    return (
        <BaseCard
            title={plugin.name}
            to={pluginPage}
            text={[plugin.version?.VersionNumber, plugin.status].filter(t => t).join(' ')}
            image={plugin.imageUrl}
            icon={<Icon name="extension" size={80} />}
        />
    );
};

export default PluginCard;
