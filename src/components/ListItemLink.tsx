import { List } from 'react-native-paper';
import React, { FC } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { TouchableOpacity } from 'react-native';

// TODO: ListItemButtonBaseProps not available in React Native Paper
interface ListItemLinkProps {
    to: string
    includePaths?: string[]
    excludePaths?: string[]
    children?: React.ReactNode
}

const isMatchingParams = (routeParams: URLSearchParams, currentParams: URLSearchParams) => {
    for (const param of routeParams) {
        if (currentParams.get(param[0]) !== param[1]) {
            return false;
        }
    }

    return true;
};

const ListItemLink: FC<ListItemLinkProps> = ({
    children,
    to,
    includePaths = [],
    excludePaths = [],
    ...params
}) => {
    const location = useLocation();
    const [ searchParams ] = useSearchParams();

    const [ toPath, toParams ] = to.split('?');
    // eslint-disable-next-line compat/compat
    const toSearchParams = new URLSearchParams(`?${toParams}`);
    const selectedPaths = [ toPath, ...includePaths ];

    const selected = selectedPaths.includes(location.pathname)
        && !excludePaths.includes(location.pathname + location.search)
        && (!toParams || isMatchingParams(toSearchParams, searchParams));

    // TODO: List.Item doesn't have 'selected' prop like MUI ListItemButton
    // TODO: component={Link} pattern doesn't work in React Native - need custom navigation
    return (
        <List.Item
            // TODO: Need to implement selection styling manually
            onPress={() => {
                // TODO: Implement navigation
            }}
            {...params}
        >
            {children}
        </List.Item>
    );
};

export default ListItemLink;
