// TODO: MUI List components (ListItem, ListItemIcon, ListItemText, etc.) need custom RN Paper List.Item implementation
import type { FolderStorageDto } from '@jellyfin/sdk/lib/generated-client';
import { ProgressBar, Text } from 'react-native-paper';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ActivityIndicator } from 'react-native';
import React, { type FC } from 'react';

import { translate } from 'lib/globalize';
import { getReadableSize } from 'utils/file';

import { StorageType } from '../constants/StorageType';
import { calculateTotal, calculateUsedPercentage } from '../utils/space';

import StorageTypeIcon from './StorageTypeIcon';

interface StorageListItemProps {
    label: string
    folder?: FolderStorageDto
}

const getStatusColor = (percent: number) => {
    if (percent >= 90) return 'error';
    if (percent >= 80) return 'warning';
    return 'success';
};

const getStorageTypeText = (type?: string | null) => {
    if (!type) return undefined;

    if (Object.keys(StorageType).includes(type)) {
        return translate(`StorageType.${type}`);
    }

    return type;
};

const StorageListItem: FC<StorageListItemProps> = ({
    label,
    folder
}) => {
    const readableUsedSpace = (typeof folder?.UsedSpace === 'undefined' || folder.UsedSpace < 0) ?
        '?' : getReadableSize(folder.UsedSpace);
    const totalSpace = calculateTotal(folder);
    const readableTotalSpace = (totalSpace < 0) ? '?' : getReadableSize(totalSpace);
    const usedPercentage = calculateUsedPercentage(folder);
    const statusColor = folder ? getStatusColor(usedPercentage) : 'primary';

    return (
        <ListItem>
            <ListItemIcon title={getStorageTypeText(folder?.StorageType)}>
                <StorageTypeIcon type={folder?.StorageType} />
            </ListItemIcon>
            <ListItemText
                primary={
                    <Text variant='bodyMedium'>
                        {label}
                    </Text>
                }
                secondary={
                    <>
                        <Text
                            style={{
                                paddingBottom: 4,
                            }}
                        >
                            {folder ? folder.Path : (
                                <ActivityIndicator size='small' />
                            )}
                        </Text>
                        <ProgressBar
                            progress={folder ? usedPercentage / 100 : undefined}
                            indeterminate={!folder}
                        />
                        <Text
                            variant='bodySmall'
                            style={{
                                textAlign: 'right'
                            }}
                        >
                            {`${readableUsedSpace} / ${readableTotalSpace}`}
                        </Text>
                    </>
                }
                slots={{
                    secondary: 'div'
                }}
            />
        </ListItem>
    );
};

export default StorageListItem;
