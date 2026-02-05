import React, { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import StopIcon from '@mui/icons-material/Stop';
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
            className='button-flat btnCancelTimer'
            title={translate('StopRecording')}
            onPress={onCancelTimerClick}
        >
            <StopIcon />
        </IconButton>
    );
};

export default CancelTimerButton;
