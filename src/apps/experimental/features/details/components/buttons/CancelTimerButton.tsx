import React, { FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQueryClient } from '@tanstack/react-query';

import { useCancelTimer } from 'hooks/api/liveTvHooks';
import { translate } from 'lib/globalize';
import loading from 'components/loading/loading';
import toast from 'components/toast/toast';

interface CancelTimerButtonProps {
    timerId: string;
    queryKey?: string[];
}

const CancelTimerButton: FC<CancelTimerButtonProps> = ({
    timerId,
    queryKey
}) => {
    const queryClient = useQueryClient();
    const cancelTimer = useCancelTimer();

    const onCancelTimerClick = useCallback(() => {
        loading.show();
        cancelTimer.mutate(
            {
                timerId: timerId
            },
            {
                onSuccess: async () => {
                    toast(translate('RecordingCancelled'));
                    loading.hide();
                    await queryClient.invalidateQueries({
                        queryKey
                    });
                },

                onError: (err: unknown) => {
                    loading.hide();
                    toast(translate('MessageCancelTimerError'));
                    console.error(
                        '[cancelTimer] failed to cancel timer',
                        err
                    );
                }
            }
        );
    }, [cancelTimer, queryClient, queryKey, timerId]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={onCancelTimerClick}
            icon={() => <Icon name="stop" size={24} />}
        />
    );
};

export default CancelTimerButton;
