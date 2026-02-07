import { translate } from 'lib/globalize';
import React, { FunctionComponent } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type IProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const RestoreConfirmationDialog: FunctionComponent<IProps> = ({ open, onClose, onConfirm }: IProps) => {
    return (
        <Portal>
            <Dialog
                visible={open}
                onDismiss={onClose}
                // TODO: maxWidth={'xs'} - no direct equivalent in react-native-paper
                // TODO: fullWidth - no direct equivalent in react-native-paper
            >
                <Dialog.Title>
                    {translate('LabelRestore')}
                </Dialog.Title>

                <Dialog.Content>
                    <Text>
                        {translate('MessageRestoreDisclaimer')}
                    </Text>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={onClose} mode='text'>
                        {translate('ButtonCancel')}
                    </Button>
                    <Button onPress={onConfirm}>
                        {translate('LabelRestore')}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default RestoreConfirmationDialog;
