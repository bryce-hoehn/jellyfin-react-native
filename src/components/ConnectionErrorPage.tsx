import DOMPurify from 'dompurify';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { appHost } from 'components/apphost';
import Page from 'components/Page';
import toast from 'components/toast/toast';
import { AppFeature } from 'constants/appFeature';
import LinkButton from 'elements/emby-button/LinkButton';
import { translate } from 'lib/globalize';
import { ConnectionState, ServerConnections } from 'lib/jellyfin-apiclient';

interface ConnectionErrorPageProps {
    state: ConnectionState
}

const ConnectionErrorPage: FC<ConnectionErrorPageProps> = ({
    state
}) => {
    const [ title, setTitle ] = useState<string>();
    const [ htmlMessage, setHtmlMessage ] = useState<string>();
    const [ message, setMessage ] = useState<string>();
    const [ isConnectDisabled, setIsConnectDisabled ] = useState(false);

    const onForceConnect = useCallback(async () => {
        setIsConnectDisabled(true);

        try {
            const server = ServerConnections.getLastUsedServer();
            await ServerConnections.updateSavedServerId(server);
            window.location.reload();
        } catch (err) {
            console.error('[ConnectionErrorPage] Failed to force connect to server', err);
            toast(translate('HeaderConnectionFailure'));
            setIsConnectDisabled(false);
        }
    }, []);

    useEffect(() => {
        switch (state) {
            case ConnectionState.ServerMismatch:
                setTitle(translate('HeaderServerMismatch'));
                setHtmlMessage(undefined);
                setMessage(translate('MessageServerMismatch'));
                return;
            case ConnectionState.ServerUpdateNeeded:
                setTitle(translate('HeaderUpdateRequired'));
                setHtmlMessage(translate(
                    'ServerUpdateNeeded',
                    '<a href="https://jellyfin.org/downloads/server/">jellyfin.org/downloads/server</a>'
                ));
                setMessage(undefined);
                return;
            case ConnectionState.Unavailable:
                setTitle(translate('HeaderServerUnavailable'));
                setHtmlMessage(undefined);
                setMessage(translate('MessageUnableToConnectToServer'));
        }
    }, [ state ]);

    if (!title) return;

    return (
        <Page
            id='connectionErrorPage'
            className='mainAnimatedPage standalonePage'
            isBackButtonEnabled={false}
        >
            <div className='padded-left padded-right'>
                <h1>{title}</h1>
                {htmlMessage && (
                    <p
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlMessage) }}
                        style={{ maxWidth: '80ch' }}
                    />
                )}
                {message && (
                    <p style={{ maxWidth: '80ch' }}>
                        {message}
                    </p>
                )}

                {appHost.supports(AppFeature.MultiServer) && (
                    <LinkButton
                        className='raised'
                        href='/selectserver'
                    >
                        {translate('ButtonChangeServer')}
                    </LinkButton>
                )}

                {state === ConnectionState.ServerMismatch && (
                    <LinkButton
                        onPress={onForceConnect}
                        style={ isConnectDisabled ? { pointerEvents: 'none' } : undefined }
                    >
                        {translate('ConnectAnyway')}
                    </LinkButton>
                )}
            </div>
        </Page>
    );
};

export default ConnectionErrorPage;
