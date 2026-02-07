import React from 'react';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import DeviceCard from 'apps/dashboard/features/devices/components/DeviceCard';
import { View } from 'react-native';
import useLiveSessions from 'apps/dashboard/features/sessions/hooks/useLiveSessions';

const DevicesWidget = () => {
    const { data: devices } = useLiveSessions();

    return (
        <Widget
            title={translate('HeaderDevices')}
            href='/dashboard/devices'
        >
            {/* TODO: Replace Stack with View and custom layout (flexWrap, flexDirection) */}
            <View>
                {devices?.map(device => (
                    <DeviceCard
                        key={device.Id}
                        device={device}
                    />
                ))}
            </View>
        </Widget>
    );
};

export default DevicesWidget;
