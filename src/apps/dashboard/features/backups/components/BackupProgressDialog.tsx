import React, { FunctionComponent } from 'react';
import { Dialog, Portal, ProgressBar } from 'react-native-paper';
import { translate } from 'lib/globalize';

type IProps = {
    open: boolean // TODO: Rename to 'visible' for RN Paper consistency
};

const BackupProgressDialog: FunctionComponent<IProps> = ({ open }) => {
    return (
        <Portal>
            {/* TODO: maxWidth={'xs'} - not available in RN Paper Dialog */}
            {/* TODO: fullWidth - not available in RN Paper Dialog */}
            <Dialog
                visible={open}
            >
                <Dialog.Title>{translate('MessageBackupInProgress')}</Dialog.Title>
                <Dialog.Content>
                    <ProgressBar indeterminate />
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default BackupProgressDialog;
