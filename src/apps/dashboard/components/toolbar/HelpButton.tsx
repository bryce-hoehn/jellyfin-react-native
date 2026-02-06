import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HelpLinks } from 'apps/dashboard/constants/helpLinks';
import { translate } from 'lib/globalize';

// TODO: Add Tooltip component - React Native Paper doesn't have a direct Tooltip equivalent
const HelpButton = () => (
    <Routes>
        {
            HelpLinks.map(({ paths, url }) => paths.map(path => (
                <Route
                    key={[url, path].join('-')}
                    path={path}
                    element={
                        // TODO: Wrap with Tooltip once available - title: translate('Help')
                        <IconButton
                            // TODO: IconButton in React Native Paper doesn't support href, rel, target props
                            // Need to handle external URL navigation differently (e.g., Linking.openURL)
                            // href={url}
                            // rel='noopener noreferrer'
                            // target='_blank'
                            // TODO: React Native Paper IconButton doesn't have a size prop
                            // size='large'
                            // TODO: React Native Paper IconButton doesn't have a color='inherit' prop
                            // May need to use theme colors or style prop
                            icon={() => <Icon name="help-outline" size={24} />}
                        >
                        </IconButton>
                    }
                />
            ))).flat()
        }
    </Routes>
);

export default HelpButton;
