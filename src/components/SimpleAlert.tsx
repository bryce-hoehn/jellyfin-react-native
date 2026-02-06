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
        <Portal>
            <Dialog visible={open} onDismiss={onClose}>
                {title && (
                    <Dialog.Title>
                        {title}
                    </Dialog.Title>
                )}
                <Dialog.Content>
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                        {text}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>
                        {translate('ButtonGotIt')}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default SimpleAlert;
