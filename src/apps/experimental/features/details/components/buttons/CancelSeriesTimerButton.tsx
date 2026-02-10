import React, { FC, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useCancelSeriesTimer } from 'hooks/api/liveTvHooks';
import { translate } from 'lib/globalize';
import loading from 'components/loading/loading';
import toast from 'components/toast/toast';
import confirm from 'components/confirm/confirm';

interface CancelSeriesTimerButtonProps {
    itemId: string;
}

const CancelSeriesTimerButton: FC<CancelSeriesTimerButtonProps> = ({
    itemId
}) => {
    const router = useRouter();
    const cancelSeriesTimer = useCancelSeriesTimer();

    const onCancelSeriesTimerClick = useCallback(() => {
        confirm({
            text: translate('MessageConfirmRecordingCancellation'),
            primary: 'delete',
            confirmText: translate('HeaderCancelSeries'),
            cancelText: translate('HeaderKeepSeries')
        })
            .then(function () {
                loading.show();
                cancelSeriesTimer.mutate(
                    {
                        timerId: itemId
                    },
                    {
                        onSuccess: async () => {
                            toast(translate('SeriesCancelled'));
                            loading.hide();
                            router.push('/livetv');
                        },
                        onError: (err: unknown) => {
                            loading.hide();
                            toast(translate('MessageCancelSeriesTimerError'));
                            console.error(
                                '[cancelSeriesTimer] failed to cancel series timer',
                                err
                            );
                        }
                    }
                );
            })
            .catch(() => {
                // confirm dialog closed
            });
    }, [cancelSeriesTimer, router, itemId]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: title prop not supported - use accessibility label
            onPress={onCancelSeriesTimerClick}
            icon={() => <Icon name="delete" size={24} />}
        />
    );
};

export default CancelSeriesTimerButton;
