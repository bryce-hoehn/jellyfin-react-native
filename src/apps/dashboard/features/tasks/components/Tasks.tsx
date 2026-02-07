import React, { FunctionComponent } from 'react';
import type { TaskInfo } from '@jellyfin/sdk/lib/generated-client/models/task-info';
// TODO: List component needs custom RN Paper List implementation
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import Task from './Task';

type TasksProps = {
    category: string;
    tasks: TaskInfo[];
};

const Tasks: FunctionComponent<TasksProps> = ({ category, tasks }: TasksProps) => {
    return (
        <View /* TODO: Add flexbox styling for spacing={2} equivalent */>
            <Text variant='headlineMedium'>{category}</Text>
            <View /* TODO: sx prop needs StyleSheet styling - bgcolor: 'background.paper' */>
                {tasks.map(task => {
                    return <Task
                        key={task.Id}
                        task={task}
                    />;
                })}
            </View>
        </View>
    );
};

export default Tasks;
