// TODO: MUI List components (ListItem, ListItemIcon, ListItemText, etc.) need custom RN Paper List.Item implementation
import React, { FunctionComponent, useCallback, useState } from 'react';
import type { BackupManifestDto } from '@jellyfin/sdk/lib/generated-client/models/backup-manifest-dto';
import { IconButton } from 'react-native-paper';
import ListItem from '@mui/material/ListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// TODO: Tooltip - Replace with React Native alternative or remove
import { translate } from 'lib/globalize';
import BackupInfoDialog from './BackupInfoDialog';

type BackupProps = {
    backup: BackupManifestDto;
    onRestore: (backup: BackupManifestDto) => void;
};

const Backup: FunctionComponent<BackupProps> = ({ backup, onRestore }) => {
    const [ isInfoDialogOpen, setIsInfoDialogOpen ] = useState(false);

    const onDialogClose = useCallback(() => {
        setIsInfoDialogOpen(false);
    }, []);

    const openDialog = useCallback(() => {
        setIsInfoDialogOpen(true);
    }, []);

    const restore = useCallback(() => {
        onRestore(backup);
    }, [ backup, onRestore ]);

    return (
        <>
            <BackupInfoDialog
                backup={backup}
                onClose={onDialogClose}
                open={isInfoDialogOpen}
            />
            <ListItem
                disablePadding
                secondaryAction={
                    // TODO: Restore Tooltip with title={translate('LabelRestore')}
                    <IconButton onPress={restore}>
                        <Icon name="restore" size={24} />
                    </IconButton>
                }
            >
                <ListItemButton onPress={openDialog}>
                    <ListItemText
                        primary={backup.DateCreated}
                        secondary={backup.Path}
                        slotProps={{
                            primary: {
                                variant: 'h3'
                            },
                            secondary: {
                                variant: 'body1'
                            }
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default Backup;
