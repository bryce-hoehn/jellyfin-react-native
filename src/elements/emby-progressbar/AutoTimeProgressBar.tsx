import React, { type FC, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ProgressBar } from 'react-native-paper';

import type { ProgressOptions } from 'types/progressOptions';

interface AutoTimeProgressBarProps {
    pct: number;
    starTtime: number;
    endTtime: number;
    isRecording: boolean;
    dataAutoMode?: string;
    progressOptions?: ProgressOptions;
}

const AutoTimeProgressBar: FC<AutoTimeProgressBarProps> = ({
    pct,
    dataAutoMode,
    isRecording,
    starTtime,
    endTtime,
    progressOptions
}) => {
    const [progress, setProgress] = useState(pct);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onAutoTimeProgress = useCallback(() => {
        const start = parseInt(starTtime.toString(), 10);
        const end = parseInt(endTtime.toString(), 10);

        const now = new Date().getTime();
        const total = end - start;
        let percentage = 100 * ((now - start) / total);

        percentage = Math.min(100, percentage);
        percentage = Math.max(0, percentage);

        setProgress(percentage);
    }, [endTtime, starTtime]);

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (dataAutoMode === 'time') {
            timerRef.current = setInterval(onAutoTimeProgress, 60000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [dataAutoMode, onAutoTimeProgress]);

    const progressBarClass = classNames(
        'itemLinearProgress',
        progressOptions?.containerClass
    );

    return (
        <ProgressBar
            // TODO: className prop not supported in RN - need to convert to style prop
            // className={progressBarClass}
            progress={progress / 100}
            // TODO: RN Paper ProgressBar doesn't support sx styling - need alternative for recording color
            // Original sx: borderRadius: 5, backgroundColor: isRecording ? error.main : primary.main
        />
    );
};

export default AutoTimeProgressBar;
