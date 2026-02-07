import React, { type FC } from 'react';
import {
    Link,
    URLSearchParamsInit,
    createSearchParams,
    useLocation,
    useSearchParams
} from 'react-router-dom';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { translate } from 'lib/globalize';

const getUrlParams = (searchParams: URLSearchParams) => {
    const parentId =
        searchParams.get('parentId') || searchParams.get('topParentId');
    const collectionType = searchParams.get('collectionType');
    const params: URLSearchParamsInit = {};

    if (parentId) {
        params.parentId = parentId;
    }

    if (collectionType) {
        params.collectionType = collectionType;
    }
    return params;
};

const SearchButton: FC = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const isSearchPath = location.pathname === '/search';
    const search = createSearchParams(getUrlParams(searchParams));
    const createSearchLink =
        {
            pathname: '/search',
            search: search ? `?${search}` : undefined
        };

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
