import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { TaskProps } from '../types/taskProps';

const TaskProgress: FunctionComponent<TaskProps> = ({ task }: TaskProps) => {
    const progress = task.CurrentProgressPercentage;

    return (
        <View>
            {/* TODO: sx props (display, alignItems, height, mr, minWidth) need RN style conversion */}
            {progress != null ? (
                <>
                    <View>
                        {/* TODO: sx props (width, mr) need RN style conversion */}
                        <ProgressBar progress={progress / 100} />
                    </View>
                    <View>
                        <Text
                            variant='bodyLarge'
                        >{`${Math.round(progress)}%`}</Text>
                    </View>
                </>
            ) : (
                <View>
                    {/* TODO: sx props (width) need RN style conversion */}
                    <ProgressBar indeterminate />
                </View>
            )}
        </View>
    );
};

export default TaskProgress;
