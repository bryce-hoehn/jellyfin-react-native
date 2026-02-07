import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useGetDownload } from 'hooks/api/libraryHooks';
import { translate } from 'lib/globalize';
import { download } from 'scripts/fileDownloader';
import type { NullableString } from 'types/base/common/shared/types';

interface DownloadButtonProps {
    itemId: string;
    itemServerId: NullableString,
    itemName: NullableString,
    itemPath: NullableString,
}

const DownloadButton: FC<DownloadButtonProps> = ({ itemId, itemServerId, itemName, itemPath }) => {
    const { data: downloadHref } = useGetDownload({ itemId });

    const onDownloadClick = useCallback(async () => {
        download([
            {
                url: downloadHref,
                itemId: itemId,
                serverId: itemServerId,
                title: itemName,
                filename: itemPath?.replace(/^.*[\\/]/, '')
            }
        ]);
    }, [downloadHref, itemId, itemName, itemPath, itemServerId]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={onDownloadClick}
            icon={() => <Icon name="file-download" size={24} />}
        />
    );
};

export default DownloadButton;
