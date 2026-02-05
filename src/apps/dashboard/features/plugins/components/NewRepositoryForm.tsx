import React, { useCallback } from 'react';
import type { RepositoryInfo } from '@jellyfin/sdk/lib/generated-client/models/repository-info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { translate } from 'lib/globalize';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type IProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (repository: RepositoryInfo) => void;
};

const NewRepositoryForm = ({ open, onClose, onAdd }: IProps) => {
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const repository: RepositoryInfo = {
            Name: data.Name?.toString(),
            Url: data.Url?.toString(),
            Enabled: true
        };

        onAdd(repository);
    }, [ onAdd ]);

    return (
        <Dialog
            open={open}
            maxWidth={'xs'}
            fullWidth
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit
                }
            }}
        >
            <DialogTitle>{translate('HeaderNewRepository')}</DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    <TextField
                        name='Name'
                        label={translate('LabelRepositoryName')}
                        helperText={translate('LabelRepositoryNameHelp')}
                        slotProps={{
                            htmlInput: {
                                required: true
                            }
                        }}
                    />

                    <TextField
                        name='Url'
                        label={translate('LabelRepositoryUrl')}
                        helperText={translate('LabelRepositoryUrlHelp')}
                        type='url'
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button
                    onPress={onClose}
                    variant='text'
                >{translate('ButtonCancel')}</Button>
                <Button type='submit'>{translate('Add')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewRepositoryForm;
