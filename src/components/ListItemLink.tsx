import { List } from 'react-native-paper';
import React, { FC } from 'react';
import { usePathname, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';

// TODO: ListItemButtonBaseProps not available in React Native Paper
interface ListItemLinkProps {
    to: string
    includePaths?: string[]
    excludePaths?: string[]
    children?: React.ReactNode
}

const isMatchingParams = (routeParams: URLSearchParams, currentParams: Record<string, string | string[]>) => {
    for (const param of routeParams) {
        const currentValue = currentParams[param[0]];
        const currentParamValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;
        if (currentParamValue !== param[1]) {
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
    const pathname = usePathname();
    const searchParams = useLocalSearchParams();

    const [ toPath, toParams ] = to.split('?');
    // eslint-disable-next-line compat/compat
    const toSearchParams = new URLSearchParams(`?${toParams}`);
    const selectedPaths = [ toPath, ...includePaths ];

    const search = new URLSearchParams(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value as string])).toString();
    const selected = selectedPaths.includes(pathname)
        && !excludePaths.includes(pathname + (search ? '?' + search : ''))
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
