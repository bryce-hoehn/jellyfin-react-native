import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { translate } from 'lib/globalize';
import React from 'react';

// TODO: DialogProps type needs to be updated for React Native Paper Dialog
type DialogProps = React.ComponentProps<typeof Dialog>;

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
                    <Text>
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
