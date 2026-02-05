import React, { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteAlternateSources } from 'hooks/api/videosHooks';
import { translate } from 'lib/globalize';
import confirm from 'components/confirm/confirm';
import loading from 'components/loading/loading';
import toast from 'components/toast/toast';

interface SplitVersionsButtonProps {
    paramId: string;
    queryKey?: string[];
}

const SplitVersionsButton: FC<SplitVersionsButtonProps> = ({
    paramId,
    queryKey
}) => {
    const queryClient = useQueryClient();
    const deleteAlternateSources = useDeleteAlternateSources();

    const splitVersions = useCallback(() => {
        confirm({
            title: translate('HeaderSplitMediaApart'),
            text: translate('MessageConfirmSplitMediaSources')
        })
            .then(function () {
                loading.show();
                deleteAlternateSources.mutate(
                    {
                        itemId: paramId
                    },
                    {
                        onSuccess: async () => {
                            loading.hide();
                            await queryClient.invalidateQueries({
                                queryKey
                            });
                        },
                        onError: (err: unknown) => {
                            loading.hide();
                            toast(translate('MessageSplitVersionsError'));
                            console.error(
                                '[splitVersions] failed to split versions',
                                err
                            );
                        }
                    }
                );
            })
            .catch(() => {
                // confirm dialog closed
            });
    }, [deleteAlternateSources, paramId, queryClient, queryKey]);

    return (
        <IconButton
            className='button-flat btnSplitVersions'
            title={translate('ButtonSplit')}
            onPress={splitVersions}
        >
            <CallSplitIcon />
        </IconButton>
    );
};

export default SplitVersionsButton;
