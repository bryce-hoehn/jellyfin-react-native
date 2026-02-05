import { ImageResolution } from '@jellyfin/sdk/lib/generated-client/models/image-resolution';
import { getConfigurationApi } from '@jellyfin/sdk/lib/utils/api/configuration-api';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Menu } from 'react-native-paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCountries } from 'apps/dashboard/features/libraries/api/useCountries';
import { useCultures } from 'apps/dashboard/features/libraries/api/useCultures';
import { getImageResolutionOptions } from 'apps/dashboard/features/libraries/utils/metadataOptions';
import Loading from 'components/loading/LoadingComponent';
import Page from 'components/Page';
import { QUERY_KEY, useConfiguration } from 'hooks/useConfiguration';
import { translate } from 'lib/globalize';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import React from 'react';
import { type ActionFunctionArgs, Form, useActionData, useNavigation } from 'react-router-dom';
import { ActionData } from 'types/actionData';
import { queryClient } from 'utils/query/queryClient';

export const action = async ({ request }: ActionFunctionArgs) => {
    const api = ServerConnections.getCurrentApi();
    if (!api) throw new Error('No Api instance available');

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const { data: config } = await getConfigurationApi(api).getConfiguration();

    config.PreferredMetadataLanguage = data.Language.toString();
    config.MetadataCountryCode = data.Country.toString();
    config.DummyChapterDuration = parseInt(data.DummyChapterDuration.toString(), 10);
    config.ChapterImageResolution = data.ChapterImageResolution.toString() as ImageResolution;

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
    const {
        data: config,
        isPending: isConfigPending,
        isError: isConfigError
    } = useConfiguration();
    const {
        data: cultures,
        isPending: isCulturesPending,
        isError: isCulturesError
    } = useCultures();
    const {
        data: countries,
        isPending: isCountriesPending,
        isError: isCountriesError
    } = useCountries();

    const navigation = useNavigation();
    const actionData = useActionData() as ActionData | undefined;
    const isSubmitting = navigation.state === 'submitting';

    const imageResolutions = getImageResolutionOptions();

    if (isConfigPending || isCulturesPending || isCountriesPending) {
        return <Loading />;
    }

    return (
        <Page
            id='metadataImagesConfigurationPage'
            title={translate('LabelMetadata')}
            className='type-interior mainAnimatedPage'
        >
            <Box className='content-primary'>
                {isConfigError || isCulturesError || isCountriesError ? (
                    <Alert severity='error'>{translate('MetadataImagesLoadError')}</Alert>
                ) : (
                    <Form method='POST'>
                        <Stack spacing={3}>
                            {!isSubmitting && actionData?.isSaved && (
                                <Alert severity='success'>
                                    {translate('SettingsSaved')}
                                </Alert>
                            )}
                            <Typography variant='h2'>{translate('HeaderPreferredMetadataLanguage')}</Typography>
                            <Typography>{translate('DefaultMetadataLangaugeDescription')}</Typography>

                            <TextField
                                name={'Language'}
                                label={translate('LabelLanguage')}
                                defaultValue={config.PreferredMetadataLanguage}
                                select
                            >
                                {cultures.map(culture => {
                                    return <MenuItem
                                        key={culture.TwoLetterISOLanguageName}
                                        value={culture.TwoLetterISOLanguageName}
                                    >{culture.DisplayName}</MenuItem>;
                                })}
                            </TextField>

                            <TextField
                                name={'Country'}
                                label={translate('LabelCountry')}
                                defaultValue={config.MetadataCountryCode}
                                select
                            >
                                {countries.map(country => {
                                    return <MenuItem
                                        key={country.DisplayName}
                                        value={country.TwoLetterISORegionName || ''}
                                    >{country.DisplayName}</MenuItem>;
                                })}
                            </TextField>

                            <Typography variant='h2'>{translate('HeaderDummyChapter')}</Typography>

                            <TextField
                                name={'DummyChapterDuration'}
                                defaultValue={config.DummyChapterDuration}
                                type='number'
                                label={translate('LabelDummyChapterDuration')}
                                helperText={translate('LabelDummyChapterDurationHelp')}
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                        required: true
                                    }
                                }}
                            />

                            <TextField
                                name={'ChapterImageResolution'}
                                select
                                defaultValue={config.ChapterImageResolution}
                                label={translate('LabelChapterImageResolution')}
                                helperText={translate('LabelChapterImageResolutionHelp')}
                            >
                                {imageResolutions.map(resolution => {
                                    return <MenuItem key={resolution.name} value={resolution.value}>{resolution.name}</MenuItem>;
                                })}
                            </TextField>

                            <Button
                                type='submit'
                                size='large'
                            >
                                {translate('Save')}
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Box>
        </Page>
    );
};

Component.displayName = 'MetadataImagesPage';
