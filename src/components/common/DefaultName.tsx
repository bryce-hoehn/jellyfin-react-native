import React, { type FC } from 'react';
import { View } from 'react-native';
import itemHelper from 'components/itemHelper';
import { isUsingLiveTvNaming } from '../cardbuilder/cardBuilderUtils';
import type { ItemDto } from 'types/base/models/item-dto';

interface DefaultNameProps {
    item: ItemDto;
}

const DefaultName: FC<DefaultNameProps> = ({ item }) => {
    const defaultName = isUsingLiveTvNaming(item.Type) ?
        item.Name :
        itemHelper.getDisplayName(item);
    return (
        <View className='cardText cardDefaultText'>
            {defaultName}
        </View>
    );
};

export default DefaultName;
