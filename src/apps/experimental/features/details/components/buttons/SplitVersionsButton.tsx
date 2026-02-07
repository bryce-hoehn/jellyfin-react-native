import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={splitVersions}
            icon={() => <Icon name="call-split" size={24} />}
        />
    );
};

export default SplitVersionsButton;
