import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import { useQueryClient } from '@tanstack/react-query';
import React, { type FC, useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ItemAction } from 'constants/itemAction';
import { translate } from 'lib/globalize';
import { useTogglePlayedMutation } from 'hooks/useFetchItems';

interface PlayedButtonProps {
    className?: string;
    isPlayed : boolean | undefined;
    itemId: string | null | undefined;
    itemType: string | null | undefined,
    queryKey?: string[]
}

const PlayedButton: FC<PlayedButtonProps> = ({
    className,
    isPlayed = false,
    itemId,
    itemType,
    queryKey
}) => {
    const queryClient = useQueryClient();
    const { mutateAsync: togglePlayedMutation } = useTogglePlayedMutation();

    const getTitle = useCallback(() => {
        let buttonTitle;
        if (itemType !== BaseItemKind.AudioBook) {
            buttonTitle = isPlayed ? translate('Watched') : translate('MarkPlayed');
        } else {
            buttonTitle = isPlayed ? translate('Played') : translate('MarkPlayed');
        }

        return buttonTitle;
    }, [itemType, isPlayed]);

    const onPress = useCallback(async () => {
        try {
            if (!itemId) {
                throw new Error('Item has no Id');
            }

            await togglePlayedMutation({
                itemId,
                isPlayed
            },
            { onSuccess: async() => {
                await queryClient.invalidateQueries({
                    queryKey,
                    type: 'all',
                    refetchType: 'active'
                });
            } });
        } catch (e) {
            console.error(e);
        }
    }, [itemId, togglePlayedMutation, isPlayed, queryClient, queryKey]);

    return (
        <IconButton
            // TODO: data-action not supported
            // data-action={ItemAction.None}
            // TODO: title prop not supported - use accessibility label
            // title={getTitle()}
            className={className}
            // TODO: IconButton size prop not available in RN Paper
            // size='small'
            onPress={onPress}
            icon={() => (
                <Icon
                    name="check"
                    size={24}
                    // TODO: color prop may need adjustment - 'error' is MUI specific
                    color={isPlayed ? 'error' : undefined}
                />
            )}
        />
    );
};

export default PlayedButton;
