import React, { FC, useCallback, useMemo } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQueryClient } from '@tanstack/react-query';

import { ItemAction } from 'constants/itemAction';
import { useApi } from 'hooks/useApi';
import { getChannelQuery } from 'hooks/api/liveTvHooks/useGetChannel';
import { translate } from 'lib/globalize';
import { playbackManager } from 'components/playback/playbackmanager';
import type { ItemDto } from 'types/base/models/item-dto';
import { ItemKind } from 'types/base/models/item-kind';
import itemHelper from 'components/itemHelper';

interface PlayOrResumeButtonProps {
    item: ItemDto;
    isResumable?: boolean;
    selectedMediaSourceId?: string | null;
    selectedAudioTrack?: number;
    selectedSubtitleTrack?: number;
}

const PlayOrResumeButton: FC<PlayOrResumeButtonProps> = ({
    item,
    isResumable,
    selectedMediaSourceId,
    selectedAudioTrack,
    selectedSubtitleTrack
}) => {
    const apiContext = useApi();
    const queryClient = useQueryClient();

    const playOptions = useMemo(() => {
        if (itemHelper.supportsMediaSourceSelection(item)) {
            return {
                startPositionTicks:
                    item.UserData && isResumable ?
                        item.UserData.PlaybackPositionTicks :
                        0,
                mediaSourceId: selectedMediaSourceId,
                audioStreamIndex: selectedAudioTrack || null,
                subtitleStreamIndex: selectedSubtitleTrack
            };
        }
    }, [
        item,
        isResumable,
        selectedMediaSourceId,
        selectedAudioTrack,
        selectedSubtitleTrack
    ]);

    const onPlayClick = useCallback(async () => {
        if (item.Type === ItemKind.Program && item.ChannelId) {
            const channel = await queryClient.fetchQuery(
                getChannelQuery(apiContext, {
                    channelId: item.ChannelId
                })
            );
            playbackManager.play({
                items: [channel]
            }).catch(err => {
                console.error('[PlayOrResumeButton] failed to play', err);
            });
            return;
        }

        playbackManager.play({
            items: [item],
            ...playOptions
        }).catch(err => {
            console.error('[PlayOrResumeButton] failed to play', err);
        });
    }, [apiContext, item, playOptions, queryClient]);

    return (
        <IconButton
            // TODO: className prop not supported in RN Paper
            // TODO: data-action not supported in React Native
            // TODO: title prop not supported - use accessibility label
            onPress={onPlayClick}
            icon={() => <Icon name={isResumable ? "replay" : "play-arrow"} size={24} />}
        />
    );
};

export default PlayOrResumeButton;
