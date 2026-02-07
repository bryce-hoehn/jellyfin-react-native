import React, { useCallback, useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { translate } from 'lib/globalize';

// TODO: DialogProps type needs to be updated for React Native Paper Dialog
type DialogProps = React.ComponentProps<typeof Dialog>;

interface InputDialogProps extends DialogProps {
    title: string;
    label: string;
    helperText?: string;
    initialText?: string;
    confirmButtonText?: string;
    onClose: () => void;
    onConfirm: (text: string) => void;
};

const InputDialog = ({
    open,
    title,
    label,
    helperText,
    initialText,
    onClose,
    confirmButtonText,
    onConfirm
}: InputDialogProps) => {
    const [ text, setText ] = useState(initialText || '');

    const onTextChange = useCallback((value: string) => {
        setText(value);
    }, []);

    const onConfirmClick = useCallback(() => {
        onConfirm(text);
        setText('');
    }, [ text, onConfirm ]);

    return (
        <Portal>
            <Dialog
                visible={open}
                onDismiss={onClose}
                // TODO: maxWidth and fullWidth props don't exist in RN Paper Dialog
            >
                {title && (
                    <Dialog.Title>
                        {title || ''}
                    </Dialog.Title>
                )}
                <Dialog.Content>
                    <TextInput
                        label={label}
                        value={text}
                        // TODO: helperText is not a direct prop in RN Paper TextInput - needs separate Text component
                        onChangeText={onTextChange}
                        mode='flat'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onConfirmClick}>
                        {confirmButtonText || translate('ButtonOk')}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default InputDialog;
