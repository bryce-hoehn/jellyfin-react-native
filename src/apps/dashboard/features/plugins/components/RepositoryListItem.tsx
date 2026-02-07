// TODO: MUI List components (ListItem, ListItemIcon, ListItemText, etc.) need custom RN Paper List.Item implementation
import React, { useCallback, useState } from 'react';
import type { RepositoryInfo } from '@jellyfin/sdk/lib/generated-client/models/repository-info';
import ListItem from '@mui/material/ListItem';
// TODO: Tooltip - Replace with React Native alternative or remove
import Icon from 'react-native-vector-icons/MaterialIcons';
import { translate } from 'lib/globalize';
import { IconButton } from 'react-native-paper';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
// TODO: Link - Implement navigation with React Navigation or Linking API
import ConfirmDialog from 'components/ConfirmDialog';

type IProps = {
    repository: RepositoryInfo;
    onDelete: (repository: RepositoryInfo) => void;
};

const RepositoryListItem = ({ repository, onDelete }: IProps) => {
    const [ isConfirmDeleteOpen, setIsConfirmDeleteOpen ] = useState(false);

    const confirmDeletePrompt = useCallback(() => {
        setIsConfirmDeleteOpen(true);
    }, []);

    const onCancel = useCallback(() => {
        setIsConfirmDeleteOpen(false);
    }, []);

    const onConfirmDelete = useCallback(() => {
        onDelete(repository);
        setIsConfirmDeleteOpen(false);
    }, [ onDelete, repository ]);

    return (
        <>
            <ConfirmDialog
                open={isConfirmDeleteOpen}
                title={translate('ConfirmDeleteRepository')}
                text={translate('DeleteRepositoryConfirmation')}
                onConfirm={onConfirmDelete}
                onCancel={onCancel}
                confirmButtonColor='error'
                confirmButtonText={translate('Delete')}
            />
            <ListItem
                disablePadding
                secondaryAction={
                    // TODO: Restore Tooltip with title={translate('ButtonRemove')}
                    <IconButton onPress={confirmDeletePrompt}>
                        <Icon name="delete" size={24} />
                    </IconButton>
                }
            >
                <ListItemButton>
                    {/* TODO: Implement Link navigation to {repository.Url} */}
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Icon name="open-in-new" size={24} color="#fff" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={repository.Name}
                        secondary={repository.Url}
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

export default RepositoryListItem;
