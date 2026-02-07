import React, { type FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type { ActivityLogEntryCell } from '../types/ActivityLogEntryCell';

// TODO: Tooltip and ClickAwayListener need custom implementation

const OverviewCell: FC<ActivityLogEntryCell> = ({ row }) => {
    const { ShortOverview, Overview } = row.original;
    const displayValue = ShortOverview ?? Overview;
    const [ open, setOpen ] = useState(false);

    const onTooltipClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onTooltipOpen = useCallback(() => {
        setOpen(true);
    }, []);

    if (!displayValue) return null;

    return (
        <View
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    overflow: 'hidden'
                }}
            >
                {/* TODO: component='div' prop needs alternative */}
                {displayValue}
            </View>
            {ShortOverview && Overview && (
                <>
                    {/* TODO: ClickAwayListener wrapper removed - needs custom implementation */}
                    {/* TODO: Tooltip wrapper removed - needs custom implementation */}
                    <IconButton onPress={onTooltipOpen}>
                        <Icon name="info" size={24} />
                    </IconButton>
                </>
            )}
        </View>
    );
};

export default OverviewCell;
