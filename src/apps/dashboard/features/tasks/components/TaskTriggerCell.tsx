import React, { FC } from 'react';
import type { MRT_Cell, MRT_RowData } from 'material-react-table';
import { useLocale } from 'hooks/useLocale';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { getTriggerFriendlyName } from '../utils/edit';
import type { TaskTriggerInfo } from '@jellyfin/sdk/lib/generated-client/models/task-trigger-info';
import { translate } from 'lib/globalize';

interface CellProps {
    cell: MRT_Cell<MRT_RowData>
}

const TaskTriggerCell: FC<CellProps> = ({ cell }) => {
    const { dateFnsLocale } = useLocale();
    const trigger = cell.getValue<TaskTriggerInfo>();

    const timeLimitHours = trigger.MaxRuntimeTicks ? trigger.MaxRuntimeTicks / 36e9 : false;

    return (
        <View>
            <Text variant='bodyLarge'>{getTriggerFriendlyName(trigger, dateFnsLocale)}</Text>
            {timeLimitHours && (
                <Text variant='bodyMedium' /* TODO: color prop needs theme color mapping */>
                    {timeLimitHours == 1 ?
                        translate('ValueTimeLimitSingleHour') :
                        translate('ValueTimeLimitMultiHour', timeLimitHours)}
                </Text>
            )}
        </View>
    );
};

export default TaskTriggerCell;
