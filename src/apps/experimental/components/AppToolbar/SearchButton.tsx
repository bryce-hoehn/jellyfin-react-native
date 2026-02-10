import React, { type FC } from 'react';
import { usePathname, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { translate } from 'lib/globalize';

const getUrlParams = (searchParams: Record<string, string | string[]>) => {
    const parentId =
        searchParams.parentId || searchParams.topParentId;
    const collectionType = searchParams.collectionType;
    const params: Record<string, string> = {};

    if (parentId && typeof parentId === 'string') {
        params.parentId = parentId;
    }

    if (collectionType && typeof collectionType === 'string') {
        params.collectionType = collectionType;
    }
    return params;
};

const SearchButton: FC = () => {
    const pathname = usePathname();
    const searchParams = useLocalSearchParams();

    const isSearchPath = pathname === '/search';
    const urlParams = getUrlParams(searchParams);
    const searchQuery = new URLSearchParams(urlParams).toString();
    const createSearchLink = `/search${searchQuery ? `?${searchQuery}` : ''}`;

    return (
        // TODO: Tooltip not available in RN Paper - consider react-native-paper-tooltip
        // TODO: size prop not directly supported in RN Paper IconButton
        // TODO: color='inherit' not supported - use theme colors
        // TODO: component={Link} not supported - needs navigation handling
        // TODO: disabled prop styling may differ
        // TODO: aria-* props not supported in React Native
        <IconButton
            icon={() => <Icon name="search" size={24} />}
            onPress={() => {/* TODO: navigation handling */}}
        />
    );
};

export default SearchButton;
