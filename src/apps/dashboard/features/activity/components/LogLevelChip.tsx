import { LogLevel } from '@jellyfin/sdk/lib/generated-client/models/log-level';
import { Chip } from 'react-native-paper';
import React, { useMemo } from 'react';

import { translate } from 'lib/globalize';

const LogLevelChip = ({ level }: { level: LogLevel }) => {
    const levelText = useMemo(() => translate(`LogLevel.${level}`), [level]);

    // TODO: Map MUI size='small' to React Native Paper compact prop
    // TODO: Map MUI color prop to React Native Paper style/mode - getLogLevelColor removed
    // TODO: Map MUI title prop to accessible label
    return (
        <Chip
            compact
            mode="flat"
        >
            {levelText}
        </Chip>
    );
};

export default LogLevelChip;
