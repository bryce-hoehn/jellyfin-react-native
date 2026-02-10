import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import React, { type FC } from 'react';

import { translate } from 'lib/globalize';

interface NoPluginResultsProps {
    isFiltered: boolean
    onViewAll: () => void
    query: string
}

const NoPluginResults: FC<NoPluginResultsProps> = ({
    isFiltered,
    onViewAll,
    query
}) => {
    // TODO: Replace Box sx prop with React Native StyleSheet (textAlign: 'center')
    return (
        <View>
            <Text>
                {
                    query ?
                        translate('SearchResultsEmpty', query) :
                        translate('NoSubtitleSearchResultsFound')
                }
            </Text>

            {isFiltered && (
                <Button
                    mode='text'
                    onPress={onViewAll}
                >
                    {translate('ViewAllPlugins')}
                </Button>
            )}
        </View>
    );
};

export default NoPluginResults;
