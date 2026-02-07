import { View } from 'react-native';
import { Text } from 'react-native-paper';
import classNames from 'classnames';
import React, { type FC, useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import loading from 'components/loading/loading';
import Page from 'components/Page';

// TODO: Alert, AlertTitle, and Paper are MUI components - need RN equivalents

interface ErrorBoundaryParams {
    pageClasses?: string[]
}

const ErrorBoundary: FC<ErrorBoundaryParams> = ({
    pageClasses = [ 'libraryPage' ]
}) => {
    const error = useRouteError() as Error;

    useEffect(() => {
        loading.hide();
    }, []);

    return (
        <Page
            id='errorBoundary'
            className={classNames('mainAnimatedPage', pageClasses)}
        >
            <View className='content-primary'>
                {/* TODO: Alert component with severity='error' needs RN equivalent */}
                <View>
                    {/* TODO: AlertTitle needs RN equivalent */}
                    <Text>
                        {error.name}
                    </Text>

                    <Text>
                        {error.message}
                    </Text>

                    {error.stack && (
                        <View>
                            {/* TODO: Paper component with variant='outlined' needs RN equivalent */}
                            {/* TODO: sx props (marginTop, backgroundColor) need RN style conversion */}
                            <View>
                                {/* TODO: component='pre' needs RN Text with monospace font */}
                                {/* TODO: sx props (overflow, margin, maxHeight) need RN style conversion */}
                                <Text>
                                    {error.stack}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Page>
    );
};

export default ErrorBoundary;
