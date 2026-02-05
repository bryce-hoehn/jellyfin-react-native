import IconButton from 'react-native-paper';
import React, { type FC } from 'react';
import { useNavigation } from '@react-navigation/native';

import type { ActivityLogEntryCell } from 'apps/dashboard/features/activity/types/ActivityLogEntryCell';
import { translate } from 'lib/globalize';
import { fontSizes } from 'constants/sizes';

const ActionsCell: FC<ActivityLogEntryCell> = ({ row }) => {
    const navigation = useNavigation();

    return row.original.ItemId ? (
        <IconButton
            size={fontSizes.large}
            icon="perm-media"
            title={translate('LabelMediaDetails')}
            onPress={() => navigation.navigate('Details', { id: row.original.ItemId })}
        />
    ) : null;
};


export default ActionsCell;
