import React from 'react';

import { translate } from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import { type ActionFunctionArgs, Form, useActionData, useNavigation } from 'react-router-dom';
import { QUERY_KEY, useConfiguration } from 'hooks/useConfiguration';
import Page from 'components/Page';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Loading from 'components/loading/LoadingComponent';
import FormHelperText from '@mui/material/FormHelperText';
import { Menu } from 'react-native-paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { getConfigurationApi } from '@jellyfin/sdk/lib/utils/api/configuration-api';
import { TrickplayScanBehavior } from '@jellyfin/sdk/lib/generated-client/models/trickplay-scan-behavior';
import { ProcessPriorityClass } from '@jellyfin/sdk/lib/generated-client/models/process-priority-class';
import { ActionData } from 'types/actionData';
import { queryClient } from 'utils/query/queryClient';

export const action = async ({ request }: ActionFunctionArgs) => {
    const api = ServerConnections.getCurrentApi();
    if (!api) throw new Error('No Api instance available');

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const { data: config } = await getConfigurationApi(api).getConfiguration();

    const options = config.TrickplayOptions;
    if (!options) throw new Error('Unexpected null TrickplayOptions');

    options.EnableHwAcceleration = data.HwAcceleration?.toString() === 'on';
    options.EnableHwEncoding = data.HwEncoding?.toString() === 'on';
    options.EnableKeyFrameOnlyExtraction = data.KeyFrameOnlyExtraction?.toString() === 'on';
    options.ScanBehavior = data.ScanBehavior.toString() as TrickplayScanBehavior;
    options.ProcessPriority = data.ProcessPriority.toString() as ProcessPriorityClass;
    options.Interval = parseInt(data.ImageInterval.toString() || '10000', 10);
    options.WidthResolutions = data.WidthResolutions.toString().replace(' ', '').split(',').map(Number);
    options.TileWidth = parseInt(data.TileWidth.toString() || '10', 10);
    options.TileHeight = parseInt(data.TileHeight.toString() || '10', 10);
    options.Qscale = parseInt(data.Qscale.toString() || '4', 10);
    options.JpegQuality = parseInt(data.JpegQuality.toString() || '90', 10);
    options.ProcessThreads = parseInt(data.TrickplayThreads.toString() || '1', 10);

    await getConfigurationApi(api)
        .updateConfiguration({ serverConfiguration: config });

    void queryClient.invalidateQueries({
        queryKey: [ QUERY_KEY ]
    });

    return {
        isSaved: true
    };
};

export const Component = () => {
    const navigation = useNavigation();
    const actionData = useActionData() as ActionData | undefined;
    const { data: defaultConfig, isPending } = useConfiguration();
    const isSubmitting = navigation.state === 'submitting';

    if (!defaultConfig || isPending) {
        return <Loading />;
    }

    return (
        <Page
            id='trickplayConfigurationPage'
            className='mainAnimatedPage type-interior'
            title={translate('Trickplay')}
        >
            <Box className='content-primary'>
                <Form method='POST'>
                    <Stack spacing={3}>
                        <Typography variant='h1'>
                            {translate('Trickplay')}
                        </Typography>

                        {!isSubmitting && actionData?.isSaved && (
                            <Alert severity='success'>
                                {translate('SettingsSaved')}
                            </Alert>
                        )}

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='HwAcceleration'
                                        defaultChecked={defaultConfig.TrickplayOptions?.EnableHwAcceleration}
                                    />
                                }
                                label={translate('LabelTrickplayAccel')}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='HwEncoding'
                                        defaultChecked={defaultConfig.TrickplayOptions?.EnableHwEncoding}
                                    />
                                }
                                label={translate('LabelTrickplayAccelEncoding')}
                            />
                            <FormHelperText>{translate('LabelTrickplayAccelEncodingHelp')}</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='KeyFrameOnlyExtraction'
                                        defaultChecked={defaultConfig.TrickplayOptions?.EnableKeyFrameOnlyExtraction}
                                    />
                                }
                                label={translate('LabelTrickplayKeyFrameOnlyExtraction')}
                            />
                            <FormHelperText>{translate('LabelTrickplayKeyFrameOnlyExtractionHelp')}</FormHelperText>
                        </FormControl>

                        <TextField
                            name='ScanBehavior'
                            select
                            defaultValue={defaultConfig.TrickplayOptions?.ScanBehavior}
                            label={translate('LabelScanBehavior')}
                            helperText={translate('LabelScanBehaviorHelp')}
                        >
                            <MenuItem value={TrickplayScanBehavior.NonBlocking}>{translate('NonBlockingScan')}</MenuItem>
                            <MenuItem value={TrickplayScanBehavior.Blocking}>{translate('BlockingScan')}</MenuItem>
                        </TextField>

                        <TextField
                            name='ProcessPriority'
                            select
                            defaultValue={defaultConfig.TrickplayOptions?.ProcessPriority}
                            label={translate('LabelProcessPriority')}
                            helperText={translate('LabelProcessPriorityHelp')}
                        >
                            <MenuItem value={ProcessPriorityClass.High}>{translate('PriorityHigh')}</MenuItem>
                            <MenuItem value={ProcessPriorityClass.AboveNormal}>{translate('PriorityAboveNormal')}</MenuItem>
                            <MenuItem value={ProcessPriorityClass.Normal}>{translate('PriorityNormal')}</MenuItem>
                            <MenuItem value={ProcessPriorityClass.BelowNormal}>{translate('PriorityBelowNormal')}</MenuItem>
                            <MenuItem value={ProcessPriorityClass.Idle}>{translate('PriorityIdle')}</MenuItem>
                        </TextField>

                        <TextField
                            label={translate('LabelImageInterval')}
                            name='ImageInterval'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.Interval}
                            helperText={translate('LabelImageIntervalHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                    required: true
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelWidthResolutions')}
                            name='WidthResolutions'
                            defaultValue={defaultConfig.TrickplayOptions?.WidthResolutions}
                            helperText={translate('LabelWidthResolutionsHelp')}
                            slotProps={{
                                htmlInput: {
                                    required: true,
                                    pattern: '[0-9,]*'
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelTileWidth')}
                            name='TileWidth'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.TileWidth}
                            helperText={translate('LabelTileWidthHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                    required: true
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelTileHeight')}
                            name='TileHeight'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.TileHeight}
                            helperText={translate('LabelTileHeightHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                    required: true
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelJpegQuality')}
                            name='JpegQuality'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.JpegQuality}
                            helperText={translate('LabelJpegQualityHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                    max: 100,
                                    required: true
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelQscale')}
                            name='Qscale'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.Qscale}
                            helperText={translate('LabelQscaleHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 2,
                                    max: 31,
                                    required: true
                                }
                            }}
                        />

                        <TextField
                            label={translate('LabelTrickplayThreads')}
                            name='TrickplayThreads'
                            type='number'
                            inputMode='numeric'
                            defaultValue={defaultConfig.TrickplayOptions?.ProcessThreads}
                            helperText={translate('LabelTrickplayThreadsHelp')}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    required: true
                                }
                            }}
                        />

                        <Button
                            type='submit'
                            size='large'
                        >
                            {translate('Save')}
                        </Button>
                    </Stack>
                </Form>
            </Box>
        </Page>
    );
};

Component.displayName = 'TrickplayPage';
