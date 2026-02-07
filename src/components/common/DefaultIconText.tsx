import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import React, { type FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getItemTypeIcon, getLibraryIcon } from 'utils/image';
import DefaultName from './DefaultName';
import type { ItemDto } from 'types/base/models/item-dto';

interface DefaultIconTextProps {
    item: ItemDto;
    defaultCardImageIcon?: string;
}

const DefaultIconText: FC<DefaultIconTextProps> = ({
    item,
    defaultCardImageIcon
}) => {
    let icon;

    if (item.Type === BaseItemKind.CollectionFolder || item.CollectionType) {
        icon = getLibraryIcon(item.CollectionType);
    }

    if (!icon) {
        icon = getItemTypeIcon(item.Type, defaultCardImageIcon);
    }

    if (icon) {
        return (
            <Icon
                // TODO: className not supported in React Native - use style prop
                name={icon}
                size={80}
                // TODO: sx prop doesn't exist - use style instead
                style={{ color: 'inherit' }}
                aria-hidden='true'
            />
        );
    }

    return <DefaultName item={item} />;
};

export default DefaultIconText;
