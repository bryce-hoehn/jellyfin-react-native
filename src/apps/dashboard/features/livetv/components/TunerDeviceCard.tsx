import React, { useCallback, useRef, useState } from 'react';
import type { TunerHostInfo } from '@jellyfin/sdk/lib/generated-client/models/tuner-host-info';
import BaseCard from 'apps/dashboard/components/BaseCard';
import DvrIcon from '@mui/icons-material/Dvr';
import getTunerName from '../utils/getTunerName';
import Menu from '@mui/material/Menu';
import { Menu } from 'react-native-paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import { translate } from 'lib/globalize';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from 'components/ConfirmDialog';
import { useDeleteTuner } from '../api/useDeleteTuner';

interface TunerDeviceCardProps {
    tunerHost: TunerHostInfo;
}

const TunerDeviceCard = ({ tunerHost }: TunerDeviceCardProps) => {
    const navigate = useNavigate();
    const actionRef = useRef<HTMLButtonElement | null>(null);
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen ] = useState(false);
    const deleteTuner = useDeleteTuner();

    const navigateToEditPage = useCallback(() => {
        navigate(`/dashboard/livetv/tuner?id=${tunerHost.Id}`);
    }, [ navigate, tunerHost ]);

    const onDelete = useCallback(() => {
        if (tunerHost.Id) {
            deleteTuner.mutate({
                id: tunerHost.Id
            }, {
                onSettled: () => {
                    setIsConfirmDeleteDialogOpen(false);
                }
            });
        }
    }, [ deleteTuner, tunerHost ]);

    const showDeleteDialog = useCallback(() => {
        setAnchorEl(null);
        setIsMenuOpen(false);
        setIsConfirmDeleteDialogOpen(true);
    }, []);

    const onDeleteDialogClose = useCallback(() => {
        setIsConfirmDeleteDialogOpen(false);
    }, []);

    const onActionPress = useCallback(() => {
        setAnchorEl(actionRef.current);
        setIsMenuOpen(true);
    }, []);

    const onMenuClose = useCallback(() => {
        setAnchorEl(null);
        setIsMenuOpen(false);
    }, []);

    return (
        <>
            <ConfirmDialog
                open={isConfirmDeleteDialogOpen}
                title={translate('HeaderDeleteDevice')}
                text={translate('MessageConfirmDeleteTunerDevice')}
                onCancel={onDeleteDialogClose}
                onConfirm={onDelete}
                confirmButtonColor='error'
                confirmButtonText={translate('Delete')}
            />

            <BaseCard
                title={tunerHost.FriendlyName || getTunerName(tunerHost.Type) || ''}
                text={tunerHost.Url || ''}
                icon={<DvrIcon sx={{ fontSize: 70 }} />}
                action={true}
                actionRef={actionRef}
                onActionPress={onActionPress}
                onPress={navigateToEditPage}
            />

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={onMenuClose}
            >
                <MenuItem onPress={navigateToEditPage}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText>{translate('Edit')}</ListItemText>
                </MenuItem>
                <MenuItem onPress={showDeleteDialog}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>{translate('Delete')}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default TunerDeviceCard;
