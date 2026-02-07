import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, ProgressBar, Text } from 'react-native-paper';
import { translate } from 'lib/globalize';

type IProps = {
    open: boolean
};

const RestoreProgressDialog: FunctionComponent<IProps> = ({ open }) => {
    return (
        <Portal>
            <Dialog
                visible={open}
                // TODO: maxWidth={'xs'} - no direct equivalent in react-native-paper
                // TODO: fullWidth - no direct equivalent in react-native-paper
            >
                <Dialog.Title>{translate('MessageRestoreInProgress')}</Dialog.Title>
                <Dialog.Content>
                    <View /* TODO: Add spacing={2} equivalent styling */>
                        <Text>{translate('MessageWaitingForServer')}</Text>
                        <ProgressBar indeterminate />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default RestoreProgressDialog;
