import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { type FC } from 'react';

import { translate } from 'lib/globalize';

interface NoPluginResultsProps {
    isFiltered: boolean
    onViewAll: () => void
    query: string
}

const NoPluginResults: FC<NoPluginResultsProps> = ({
    isFiltered,
    onViewAll,
    query
}) => {
    return (
        <Box
            sx={{
                textAlign: 'center'
            }}
        >
            <Typography
                component='div'
                sx={{
                    marginTop: 2,
                    marginBottom: 1
                }}
            >
                {
                    query ?
                        translate('SearchResultsEmpty', query) :
                        translate('NoSubtitleSearchResultsFound')
                }
            </Typography>

            {isFiltered && (
                <Button
                    variant='text'
                    onPress={onViewAll}
                >
                    {translate('ViewAllPlugins')}
                </Button>
            )}
        </Box>
    );
};

export default NoPluginResults;
