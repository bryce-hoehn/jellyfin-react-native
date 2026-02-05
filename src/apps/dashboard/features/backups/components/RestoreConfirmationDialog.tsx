import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { translate } from 'lib/globalize';
import React, { FunctionComponent } from 'react';

type IProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const RestoreConfirmationDialog: FunctionComponent<IProps> = ({ open, onClose, onConfirm }: IProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'xs'}
            fullWidth
        >
            <DialogTitle>
                {translate('LabelRestore')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {translate('MessageRestoreDisclaimer')}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onPress={onClose} variant='text'>
                    {translate('ButtonCancel')}
                </Button>
                <Button onPress={onConfirm}>
                    {translate('LabelRestore')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RestoreConfirmationDialog;
