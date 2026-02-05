import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Page from 'components/Page';
import { translate } from 'lib/globalize';
import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useRepositories } from 'apps/dashboard/features/plugins/api/useRepositories';
import Loading from 'components/loading/LoadingComponent';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import RepositoryListItem from 'apps/dashboard/features/plugins/components/RepositoryListItem';
import type { RepositoryInfo } from '@jellyfin/sdk/lib/generated-client/models/repository-info';
import { useSetRepositories } from 'apps/dashboard/features/plugins/api/useSetRepositories';
import NewRepositoryForm from 'apps/dashboard/features/plugins/components/NewRepositoryForm';

export const Component = () => {
    const { data: repositories, isPending, isError } = useRepositories();
    const [ isRepositoryFormOpen, setIsRepositoryFormOpen ] = useState(false);
    const setRepositories = useSetRepositories();

    const onDelete = useCallback((repository: RepositoryInfo) => {
        if (repositories) {
            setRepositories.mutate({
                repositoryInfo: repositories.filter(currentRepo => currentRepo.Url !== repository.Url)
            });
        }
    }, [ repositories, setRepositories ]);

    const onRepositoryAdd = useCallback((repository: RepositoryInfo) => {
        if (repositories) {
            setRepositories.mutate({
                repositoryInfo: [
                    ...repositories,
                    repository
                ]
            }, {
                onSettled: () => {
                    setIsRepositoryFormOpen(false);
                }
            });
        }
    }, [ repositories, setRepositories ]);

    const openRepositoryForm = useCallback(() => {
        setIsRepositoryFormOpen(true);
    }, []);

    const onRepositoryFormClose = useCallback(() => {
        setIsRepositoryFormOpen(false);
    }, []);

    if (isPending) {
        return <Loading />;
    }

    return (
        <Page
            id='repositories'
            title={translate('TabRepositories')}
            className='type-interior mainAnimatedPage'
        >
            <NewRepositoryForm
                open={isRepositoryFormOpen}
                onClose={onRepositoryFormClose}
                onAdd={onRepositoryAdd}
            />
            <Box className='content-primary'>
                {isError ? (
                    <Alert severity='error'>{translate('RepositoriesPageLoadError')}</Alert>
                ) : (
                    <Stack spacing={3}>
                        <Typography variant='h1'>{translate('TabRepositories')}</Typography>

                        <Button
                            sx={{ alignSelf: 'flex-start' }}
                            startIcon={<AddIcon />}
                            onPress={openRepositoryForm}
                        >
                            {translate('HeaderNewRepository')}
                        </Button>

                        {repositories.length > 0 ? (
                            <List sx={{ bgcolor: 'background.paper' }}>
                                {repositories.map(repository => {
                                    return <RepositoryListItem
                                        key={repository.Url}
                                        repository={repository}
                                        onDelete={onDelete}
                                    />;
                                })}
                            </List>
                        ) : (
                            <Stack alignSelf='center' alignItems='center' maxWidth={'500px'} spacing={2}>
                                <Typography variant='h2'>{translate('MessageNoRepositories')}</Typography>
                                <Typography textAlign='center'>{translate('MessageAddRepository')}</Typography>
                            </Stack>
                        )}
                    </Stack>
                )}
            </Box>
        </Page>
    );
};

Component.displayName = 'PluginRepositoriesPage';
