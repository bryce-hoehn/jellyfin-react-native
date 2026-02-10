import { FunctionComponent, useEffect } from 'react';
import { usePathname, useLocalSearchParams } from 'expo-router';

import viewManager from './viewManager/viewManager';
import { translate } from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import type { RestoreViewFailResponse } from 'types/viewManager';

interface ServerContentPageProps {
    view: string
}

/**
 * Page component that renders html content from a server request.
 * Uses the ViewManager to dynamically load and execute the page JS.
 */
const ServerContentPage: FunctionComponent<ServerContentPageProps> = ({ view }) => {
    const pathname = usePathname();
    const searchParams = useLocalSearchParams();
    const search = new URLSearchParams(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value as string])).toString();

    useEffect(() => {
        const loadPage = () => {
            const viewOptions = {
                url: pathname + (search ? '?' + search : ''),
                state: undefined,
                autoFocus: false,
                options: {
                    supportsThemeMedia: false,
                    enableMediaControl: true
                }
            };

            viewManager.tryRestoreView(viewOptions)
                .catch(async (result?: RestoreViewFailResponse) => {
                    if (!result?.cancelled) {
                        const apiClient = ServerConnections.currentApiClient();

                        // Fetch the view html from the server and translate it
                        const viewHtml = await apiClient?.get(apiClient.getUrl(view + (search ? '?' + search : '')))
                            .then((html: string) => translateHtml(html));

                        viewManager.loadView({
                            ...viewOptions,
                            view: viewHtml
                        });
                    }
                });
        };

        loadPage();
    },
    // state is NOT included as a dependency here since dialogs will update state while the current view stays the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        view,
        pathname,
        search
    ]);

    return null;
};

export default ServerContentPage;
