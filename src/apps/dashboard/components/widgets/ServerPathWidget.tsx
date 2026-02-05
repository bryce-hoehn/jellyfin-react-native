import List from '@mui/material/List';
import React from 'react';
import StorageListItem from 'apps/dashboard/features/storage/components/StorageListItem';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import { useSystemStorage } from 'apps/dashboard/features/storage/api/useSystemStorage';

const ServerPathWidget = () => {
    const { data: systemStorage } = useSystemStorage();

    return (
        <Widget
            title={translate('HeaderPaths')}
            href='/dashboard/settings'
        >
            <List sx={{ bgcolor: 'background.paper' }}>
                <StorageListItem
                    label={translate('LabelCache')}
                    folder={systemStorage?.CacheFolder}
                />
                <StorageListItem
                    label={translate('LabelImageCache')}
                    folder={systemStorage?.ImageCacheFolder}
                />
                <StorageListItem
                    label={translate('LabelProgramData')}
                    folder={systemStorage?.ProgramDataFolder}
                />
                <StorageListItem
                    label={translate('LabelLogs')}
                    folder={systemStorage?.LogFolder}
                />
                <StorageListItem
                    label={translate('LabelMetadata')}
                    folder={systemStorage?.InternalMetadataFolder}
                />
                <StorageListItem
                    label={translate('LabelTranscodes')}
                    folder={systemStorage?.TranscodingTempFolder}
                />
                <StorageListItem
                    label={translate('LabelWeb')}
                    folder={systemStorage?.WebFolder}
                />
            </List>
        </Widget>
    );
};

export default ServerPathWidget;
