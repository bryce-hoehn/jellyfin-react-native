import Link from '@mui/material/Link/Link';
import Paper, { type PaperProps } from '@mui/material/Paper/Paper';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableCell from '@mui/material/TableCell/TableCell';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import TableRow from '@mui/material/TableRow/TableRow';
import React, { FC } from 'react';
import { Link } from 'expo-router';

import { translate } from 'lib/globalize';

import type { PluginDetails } from '../types/PluginDetails';

interface PluginDetailsTableProps extends PaperProps {
    isPluginLoading: boolean
    isRepositoryLoading: boolean
    pluginDetails?: PluginDetails
}

const PluginDetailsTable: FC<PluginDetailsTableProps> = ({
    isPluginLoading,
    isRepositoryLoading,
    pluginDetails,
    ...paperProps
}) => (
    <TableContainer component={Paper} {...paperProps}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant='head'>
                        {translate('LabelStatus')}
                    </TableCell>
                    <TableCell>
                        {
                            (isPluginLoading && <Skeleton />)
                            || pluginDetails?.status
                            || translate('LabelNotInstalled')
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant='head'>
                        {translate('LabelVersion')}
                    </TableCell>
                    <TableCell>
                        {
                            (isPluginLoading && <Skeleton />)
                            || pluginDetails?.version?.version
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant='head'>
                        {translate('LabelDeveloper')}
                    </TableCell>
                    <TableCell>
                        {
                            (isRepositoryLoading && <Skeleton />)
                            || pluginDetails?.owner
                            || translate('Unknown')
                        }
                    </TableCell>
                </TableRow>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell variant='head'>
                        {translate('LabelRepository')}
                    </TableCell>
                    <TableCell>
                        {
                            (isRepositoryLoading && <Skeleton />)
                            || (pluginDetails?.status && pluginDetails?.canUninstall === false
                                && translate('LabelBundled')
                            )
                            || (pluginDetails?.version?.repositoryUrl && (
                                <Link
                                    href={pluginDetails.version.repositoryUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {pluginDetails.version.repositoryName}
                                </Link>
                            ))
                            || translate('Unknown')
                        }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);

export default PluginDetailsTable;
