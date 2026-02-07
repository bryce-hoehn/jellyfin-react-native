import React, { FunctionComponent, useMemo } from 'react';
import { TaskProps } from '../types/taskProps';
import { useLocale } from 'hooks/useLocale';
import { formatDistance, formatDistanceToNow, parseISO } from 'date-fns';
import { Text } from 'react-native-paper';
import { translate } from 'lib/globalize';

const TaskLastRan: FunctionComponent<TaskProps> = ({ task }: TaskProps) => {
    const { dateFnsLocale } = useLocale();

    const [ lastRan, timeTaken ] = useMemo(() => {
        if (task.LastExecutionResult?.StartTimeUtc && task.LastExecutionResult?.EndTimeUtc) {
            const endTime = parseISO(task.LastExecutionResult.EndTimeUtc);
            const startTime = parseISO(task.LastExecutionResult.StartTimeUtc);

            return [
                formatDistanceToNow(endTime, { locale: dateFnsLocale, addSuffix: true }),
                formatDistance(startTime, endTime, { locale: dateFnsLocale })
            ];
        }
        return [];
    }, [task, dateFnsLocale]);

    if (task.State == 'Idle') {
        if (task.LastExecutionResult?.StartTimeUtc && task.LastExecutionResult?.EndTimeUtc) {
            const lastResultStatus = task.LastExecutionResult.Status;

            return (
                <Text variant='bodyLarge'>
                    {/* TODO: sx props (lineHeight, color) need RN style conversion */}
                    {translate('LabelScheduledTaskLastRan', lastRan, timeTaken)}

                    {/* TODO: display='inline' and color props (error/blue) need RN implementation */}
                    {lastResultStatus == 'Failed' && <Text>{` (${translate('LabelFailed')})`}</Text>}
                    {lastResultStatus == 'Cancelled' && <Text>{` (${translate('LabelCancelled')})`}</Text>}
                    {lastResultStatus == 'Aborted' && <Text>{` (${translate('LabelAbortedByServerShutdown')})`}</Text>}
                </Text>
            );
        }
    } else {
        return (
            <Text>{/* TODO: sx props (color) need RN style conversion */}{translate('LabelStopping')}</Text>
        );
    }
};

export default TaskLastRan;
