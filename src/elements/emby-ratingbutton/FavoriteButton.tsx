import React, { type FC, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ItemAction } from 'constants/itemAction';
import { useToggleFavoriteMutation } from 'hooks/useFetchItems';
import { translate } from 'lib/globalize';

interface FavoriteButtonProps {
    className?: string;
    isFavorite: boolean | undefined;
    itemId: string | null | undefined;
    queryKey?: string[]
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
    className,
    isFavorite = false,
    itemId,
    queryKey
}) => {
    const queryClient = useQueryClient();
    const { mutateAsync: toggleFavoriteMutation } = useToggleFavoriteMutation();

    const onPress = useCallback(async () => {
        try {
            if (!itemId) {
                throw new Error('Item has no Id');
            }

            await toggleFavoriteMutation({
                itemId,
                isFavorite
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
    }, [isFavorite, itemId, queryClient, queryKey, toggleFavoriteMutation]);

    return (
        <IconButton
            // TODO: data-action not supported
            // data-action={ItemAction.None}
            className={className}
            // TODO: title prop not supported - use accessibility label
            // title={isFavorite ? translate('Favorite') : translate('AddToFavorites')}
            // TODO: IconButton size prop not available in RN Paper
            // size='small'
            onPress={onPress}
            icon={() => (
                <Icon
                    name="favorite"
                    size={24}
                    // TODO: color prop may need adjustment - 'error' is MUI specific
                    color={isFavorite ? 'error' : undefined}
                />
            )}
        />
    );
};

export default FavoriteButton;
