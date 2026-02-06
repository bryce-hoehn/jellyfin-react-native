import React, { FC, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

import { translate } from 'lib/globalize';

interface NewCollectionButtonProps {
    isTextVisible: boolean
}

// TODO: startIcon not directly supported in RN Paper Button
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
            mode='contained'
            onPress={showCollectionEditor}
        >
            {isTextVisible ? (
                translate('NewCollection')
            ) : (
                <Icon name="add" size={24} />
            )}
        </Button>
    );
};

export default NewCollectionButton;
