import { getConfigurationApi } from '@jellyfin/sdk/lib/utils/api/configuration-api';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Menu } from 'react-native-paper';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Loading from 'components/loading/LoadingComponent';
import Page from 'components/Page';
import SimpleAlert from 'components/SimpleAlert';
import { QUERY_KEY, useNamedConfiguration } from 'hooks/useNamedConfiguration';
import { useUsers } from 'hooks/useUsers';
import { translate } from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import React, { useCallback, useState } from 'react';
import { type ActionFunctionArgs, Form, useActionData, useNavigation } from 'react-router-dom';
import { ActionData } from 'types/actionData';
import { queryClient } from 'utils/query/queryClient';
import type { XbmcMetadataOptions } from '@jellyfin/sdk/lib/generated-client/models/xbmc-metadata-options';

const CONFIG_KEY = 'xbmcmetadata';

export const action = async ({ request }: ActionFunctionArgs) => {
    const api = ServerConnections.getCurrentApi();
    if (!api) throw new Error('No Api instance available');

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const newConfig: XbmcMetadataOptions = {
        UserId: data.UserId?.toString(),
        ReleaseDateFormat: 'yyyy-MM-dd',
        SaveImagePathsInNfo: data.SaveImagePathsInNfo?.toString() === 'on',
        EnablePathSubstitution: data.EnablePathSubstitution?.toString() === 'on',
        EnableExtraThumbsDuplication: data.EnableExtraThumbsDuplication?.toString() === 'on'
    };

    await getConfigurationApi(api)
        .updateNamedConfiguration({ key: CONFIG_KEY, body: newConfig });

    void queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, CONFIG_KEY]
    });

    return {
        isSaved: true
    };
};

export const Component = () => {
    const {
        data: config,
        isPending: isConfigPending,
        isError: isConfigError
    } = useNamedConfiguration<XbmcMetadataOptions>(CONFIG_KEY);
    const {
        data: users,
        isPending: isUsersPending,
        isError: isUsersError
    } = useUsers();
    const navigation = useNavigation();
    const actionData = useActionData() as ActionData | undefined;
    const isSubmitting = navigation.state === 'submitting';
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const onAlertClose = useCallback(() => {
        setIsAlertOpen(false);
    }, []);

    const onSubmit = useCallback(() => {
        setIsAlertOpen(true);
    }, []);

    if (isConfigPending || isUsersPending) {
        return <Loading />;
    }

    return (
        <Page
            id='metadataNfoPage'
            title={translate('TabNfoSettings')}
            className='type-interior mainAnimatedPage'
        >
            <SimpleAlert
                open={isAlertOpen}
                text={translate('MetadataSettingChangeHelp')}
                onClose={onAlertClose}
            />
            <Box className='content-primary'>
                {isConfigError || isUsersError ? (
                    <Alert severity='error'>{translate('MetadataNfoLoadError')}</Alert>
                ) : (
                    <Form method='POST' onSubmit={onSubmit}>
                        <Stack spacing={3}>
                            {!isSubmitting && actionData?.isSaved && (
                                <Alert severity='success'>
                                    {translate('SettingsSaved')}
                                </Alert>
                            )}
                            <Typography variant='h1'>{translate('TabNfoSettings')}</Typography>
                            <Typography>{translate('HeaderKodiMetadataHelp')}</Typography>

                            <TextField
                                name={'UserId'}
                                label={translate('LabelKodiMetadataUser')}
                                defaultValue={config.UserId || ''}
                                select
                                helperText={translate('LabelKodiMetadataUserHelp')}
                                slotProps={{
                                    select: {
                                        displayEmpty: true
                                    },

                                    inputLabel: {
                                        shrink: true
                                    }
                                }}
                            >
                                <MenuItem value=''>{translate('None')}</MenuItem>
                                {users.map(user =>
                                    <MenuItem key={user.Id} value={user.Id}>{user.Name}</MenuItem>
                                )}
                            </TextField>

                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={'SaveImagePathsInNfo'}
                                            defaultChecked={config.SaveImagePathsInNfo}
                                        />
                                    }
                                    label={translate('LabelKodiMetadataSaveImagePaths')}
                                />
                                <FormHelperText>{translate('LabelKodiMetadataSaveImagePathsHelp')}</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={'EnablePathSubstitution'}
                                            defaultChecked={config.EnablePathSubstitution}
                                        />
                                    }
                                    label={translate('LabelKodiMetadataEnablePathSubstitution')}
                                />
                                <FormHelperText>{translate('LabelKodiMetadataEnablePathSubstitutionHelp')}</FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={'EnableExtraThumbsDuplication'}
                                            defaultChecked={config.EnableExtraThumbsDuplication}
                                        />
                                    }
                                    label={translate('LabelKodiMetadataEnableExtraThumbs')}
                                />
                                <FormHelperText>{translate('LabelKodiMetadataEnableExtraThumbsHelp')}</FormHelperText>
                            </FormControl>

                            <Button type='submit' size='large'>
                                {translate('Save')}
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Box>
        </Page>
    );
};

Component.displayName = 'NFOSettingsPage';
