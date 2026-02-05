import React, { FC, useCallback } from 'react';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import { translate } from 'lib/globalize';

interface NewCollectionButtonProps {
    isTextVisible: boolean
}

const NewCollectionButton: FC<NewCollectionButtonProps> = ({
    isTextVisible
}) => {
    const showCollectionEditor = useCallback(() => {
        import('components/collectionEditor/collectionEditor').then(
            ({ default: CollectionEditor }) => {
                const serverId = window.ApiClient.serverId();
                const collectionEditor = new CollectionEditor();
                collectionEditor.show({
                    items: [],
                    serverId: serverId
                }).catch(() => {
                    // closed collection editor
                });
            }).catch(err => {
            console.error('[NewCollection] failed to load collection editor', err);
        });
    }, []);

    return (
        <Button
            variant='contained'
            startIcon={isTextVisible ? <Add /> : undefined}
            onPress={showCollectionEditor}
        >
            {isTextVisible ? (
                translate('NewCollection')
            ) : (
                <Add />
            )}
        </Button>
    );
};

export default NewCollectionButton;
