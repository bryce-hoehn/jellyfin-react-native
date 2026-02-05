import React, { type FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { translate } from 'lib/globalize';

interface NoItemsMessageProps {
    message?: string;
}

const NoItemsMessage: FC<NoItemsMessageProps> = ({
    message = 'MessageNoItemsAvailable'
}) => {
    return (
        <Box className='noItemsMessage centerMessage'>
            <Typography variant='h1'>
                {translate('MessageNothingHere')}
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
                {translate(message)}
            </Typography>
        </Box>
    );
};

export default NoItemsMessage;
