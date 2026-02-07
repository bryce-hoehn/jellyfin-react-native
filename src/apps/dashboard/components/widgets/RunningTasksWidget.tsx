import React, { useMemo } from 'react';
import { translate } from 'lib/globalize';
import Widget from './Widget';
import type { TaskInfo } from '@jellyfin/sdk/lib/generated-client/models/task-info';
import { View } from 'react-native';
import { TaskState } from '@jellyfin/sdk/lib/generated-client/models/task-state';
import { Text } from 'react-native-paper';
import TaskProgress from 'apps/dashboard/features/tasks/components/TaskProgress';

type RunningTasksWidgetProps = {
    tasks?: TaskInfo[];
};

const RunningTasksWidget = ({ tasks }: RunningTasksWidgetProps) => {
    const runningTasks = useMemo(() => {
        return tasks?.filter(v => v.State == TaskState.Running) || [];
    }, [ tasks ]);

    if (runningTasks.length == 0) return null;

    return (
        <Widget
            title={translate('HeaderRunningTasks')}
            href='/dashboard/tasks'
        >
            {/* TODO: Replace Paper with View and custom styling */}
            {/* TODO: Replace Stack with View and custom layout */}
            {/* TODO: Replace sx prop with StyleSheet */}
            <View>
                <View>
                    {runningTasks.map((task => (
                        <View key={task.Id}>
                            <Text>{task.Name}</Text>
                            <TaskProgress task={task} />
                        </View>
                    )))}
                </View>
            </View>
        </Widget>
    );
};

export default RunningTasksWidget;
