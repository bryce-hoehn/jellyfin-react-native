import React, { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';

interface ListContentWrapperProps {
    itemOverview: string | null | undefined;
    enableContentWrapper?: boolean;
    enableOverview?: boolean;
}

const ListContentWrapper: FC<PropsWithChildren<ListContentWrapperProps>> = ({
    itemOverview,
    enableContentWrapper,
    enableOverview,
    children
}) => {
    if (enableContentWrapper) {
        return (
            <>
                <View className='listItem-content'>{children}</View>

                {enableOverview && itemOverview && (
                    <View className='listItem-bottomoverview secondary'>
                        <bdi>{itemOverview}</bdi>
                    </View>
                )}
            </>
        );
    } else {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }
};

export default ListContentWrapper;
