import React, { FC, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
// TODO: ButtonGroup not available - using View
// TODO: useMediaQuery needs useWindowDimensions
import useMediaQuery from '@mui/material/useMediaQuery';

import { translate } from 'lib/globalize';
import * as userSettings from 'scripts/settings/userSettings';
import { LibraryViewSettings } from 'types/library';

interface PaginationProps {
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<React.SetStateAction<LibraryViewSettings>>;
    totalRecordCount: number;
    isPlaceholderData: boolean
}

const Pagination: FC<PaginationProps> = ({
    libraryViewSettings,
    setLibraryViewSettings,
    totalRecordCount,
    isPlaceholderData
}) => {
    const isSmallScreen = useMediaQuery((t: any) => t.breakpoints.up('sm'));

    const limit = userSettings.libraryPageSize(undefined);
    const startIndex = libraryViewSettings.StartIndex ?? 0;
    const recordsStart = totalRecordCount ? startIndex + 1 : 0;
    const recordsEnd = limit ?
        Math.min(startIndex + limit, totalRecordCount) :
        totalRecordCount;
    const showControls = limit > 0 && limit < totalRecordCount;

    const onNextPageClick = useCallback(() => {
        const newIndex = startIndex + limit;
        setLibraryViewSettings((prevState) => ({
            ...prevState,
            StartIndex: newIndex
        }));
    }, [limit, setLibraryViewSettings, startIndex]);

    const onPreviousPageClick = useCallback(() => {
        const newIndex = Math.max(0, startIndex - limit);
        setLibraryViewSettings((prevState) => ({
            ...prevState,
            StartIndex: newIndex
        }));
    }, [limit, setLibraryViewSettings, startIndex]);

    return (
        <View
            /* TODO: Add flexbox styling for direction='row', spacing={0.5}, alignItems: 'center', flexGrow, marginLeft */
        >
            {!isSmallScreen && (
                <Button
                    /* TODO: color prop needs theme color mapping */
                    mode='text'
                    accessibilityLabel={translate('Previous')} /* TODO: title prop mapped to accessibilityLabel */
                    disabled={!showControls || startIndex == 0 || isPlaceholderData}
                    onPress={onPreviousPageClick}
                >
                    <Icon name="arrow-back" size={24} />
                </Button>
            )}

            <View
                /* TODO: sx prop needs StyleSheet styling - display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 1, marginRight: 1 */
            >
                <Text variant='bodyMedium'>
                    {translate(
                        'ListPaging',
                        recordsStart,
                        recordsEnd,
                        totalRecordCount
                    )}
                </Text>
            </View>

            {isSmallScreen && (
                <View
                    /* TODO: color prop needs theme color mapping */
                    /* TODO: ButtonGroup not available - using View */
                >
                    <Button
                        accessibilityLabel={translate('Previous')} /* TODO: title prop mapped to accessibilityLabel */
                        disabled={!showControls || startIndex == 0 || isPlaceholderData}
                        onPress={onPreviousPageClick}
                    >
                        <Icon name="arrow-back" size={24} />
                    </Button>

                    <Button
                        accessibilityLabel={translate('Next')} /* TODO: title prop mapped to accessibilityLabel */
                        disabled={!showControls || startIndex + limit >= totalRecordCount || isPlaceholderData }
                        onPress={onNextPageClick}
                    >
                        <Icon name="arrow-forward" size={24} />
                    </Button>
                </View>
            )}

            {!isSmallScreen && (
                <Button
                    /* TODO: color prop needs theme color mapping */
                    mode='text'
                    accessibilityLabel={translate('Next')} /* TODO: title prop mapped to accessibilityLabel */
                    disabled={!showControls || startIndex + limit >= totalRecordCount || isPlaceholderData }
                    onPress={onNextPageClick}
                >
                    <Icon name="arrow-forward" size={24} />
                </Button>
            )}
        </View>
    );
};

export default Pagination;
