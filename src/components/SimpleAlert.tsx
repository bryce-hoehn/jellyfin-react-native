import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { translate } from 'lib/globalize';
import React from 'react';

interface SimpleAlertDialog extends DialogProps {
    title?: string;
    text: string;
    onClose: () => void
};

const SimpleAlert = ({ open, title, text, onClose }: SimpleAlertDialog) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && (
                <DialogTitle>
                    {title}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onPress={onClose}>
                    {translate('ButtonGotIt')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SimpleAlert;
