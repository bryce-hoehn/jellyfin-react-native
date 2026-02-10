import { Button, Dialog, Portal, Text } from 'react-native-paper';
import React, { type FC } from 'react';
import { View } from 'react-native';

import { translate } from 'lib/globalize';

// TODO: DialogProps type needs to be updated for React Native Paper Dialog
type DialogProps = React.ComponentProps<typeof Dialog>;

interface ConfirmDialogProps extends DialogProps {
    confirmButtonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    confirmButtonText?: string
    title: string
    text: string
    onCancel: () => void
    onConfirm: () => void
}

/** Convenience wrapper for a simple React Native Paper Dialog component for displaying a prompt that needs confirmation. */
const ConfirmDialog: FC<ConfirmDialogProps> = ({
    confirmButtonColor = 'primary',
    confirmButtonText,
    title,
    text,
    onCancel,
    onConfirm,
    ...dialogProps
}) => (
    <Portal>
        <Dialog onDismiss={onCancel} {...dialogProps}>
            <Dialog.Title>
                {title}
            </Dialog.Title>
            <Dialog.Content>
                <Text>
                    {text}
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    mode='text'
                    onPress={onCancel}
                >
                    {translate('ButtonCancel')}
                </Button>
                <Button
                    // TODO: confirmButtonColor needs mapping - RN Paper doesn't use same color prop system
                    onPress={onConfirm}
                >
                    {confirmButtonText || translate('ButtonOk')}
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
);

export default ConfirmDialog;
