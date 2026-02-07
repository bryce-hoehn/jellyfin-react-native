import React from 'react';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSystemInfo } from 'hooks/useSystemInfo';

type ServerInfoWidgetProps = {
    onScanLibrariesClick?: () => void;
    onRestartClick?: () => void;
    onShutdownClick?: () => void;
    isScanning?: boolean;
};

const ServerInfoWidget = ({
    onScanLibrariesClick,
    onRestartClick,
    onShutdownClick,
    isScanning
}: ServerInfoWidgetProps) => {
    const { data: systemInfo, isPending } = useSystemInfo();

    return (
        <Widget
            title={translate('TabServer')}
            href='/dashboard/settings'
        >
            {/* TODO: Replace Stack with View and custom layout */}
            {/* TODO: Replace Paper with View and custom styling */}
            {/* TODO: Replace Skeleton with ActivityIndicator or custom skeleton */}
            <View>
                <View>
                    <View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{translate('LabelServerName')}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{translate('LabelServerVersion')}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{translate('LabelWebVersion')}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{translate('LabelBuildVersion')}</Text>
                        </View>
                        <View>
                            {isPending ? (
                                <>
                                    <Text>Loading...</Text>
                                    <Text>Loading...</Text>
                                    <Text>Loading...</Text>
                                    <Text>Loading...</Text>
                                </>
                            ) : (
                                <>
                                    <Text>{systemInfo?.ServerName}</Text>
                                    <Text>{systemInfo?.Version}</Text>
                                    <Text>{__PACKAGE_JSON_VERSION__}</Text>
                                    <Text>{__JF_BUILD_VERSION__}</Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>

                {/* TODO: Replace startIcon with icon prop */}
                {/* TODO: Replace sx prop with StyleSheet */}
                <View>
                    <Button
                        onPress={onScanLibrariesClick}
                        disabled={isScanning}
                    >
                        {translate('ButtonScanAllLibraries')}
                    </Button>

                    <Button
                        onPress={onRestartClick}
                    >
                        {translate('Restart')}
                    </Button>

                    <Button
                        onPress={onShutdownClick}
                    >
                        {translate('ButtonShutdown')}
                    </Button>
                </View>
            </View>
        </Widget>
    );
};

export default ServerInfoWidget;
