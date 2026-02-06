import React, { type FC, type PropsWithChildren } from 'react';
import { View, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import classNames from 'classnames';
import ItemsContainer, {
    type ItemsContainerProps
} from 'elements/emby-itemscontainer/ItemsContainer';
import Scroller, { type ScrollerProps } from 'elements/emby-scroller/Scroller';
import Cards from 'components/cardbuilder/Card/Cards';
import Lists from 'components/listview/List/Lists';
import type { CardOptions } from 'types/cardOptions';
import type { ListOptions } from 'types/listOptions';
import type { ItemDto } from 'types/base/models/item-dto';

interface SectionHeaderProps {
    className?: string;
    itemsLength?: number;
    url?: string;
    title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    className,
    itemsLength = 0,
    url
}) => {
    const sectionHeaderClass = classNames(
        'sectionTitleContainer sectionTitleContainer-cards',
        'padded-left',
        className
    );

    // TODO: Link component and classNames need adaptation for React Native
    return (
        <View className={sectionHeaderClass}>
            {url && itemsLength > 5 ? (
                <TouchableOpacity
                    className='clearLink button-flat sectionTitleTextButton'
                    onPress={() => {
                        // TODO: Navigation needs proper implementation
                        if (url.startsWith('http')) {
                            Linking.openURL(url);
                        }
                    }}
                >
                    <Text
                        className='sectionTitle sectionTitle-cards'
                        variant='headlineMedium'
                    >
                        {title}
                    </Text>
                    <Icon name="chevron-right" size={24} style={{ paddingTop: 5 }} />
                </TouchableOpacity>
            ) : (
                <Text
                    className='sectionTitle sectionTitle-cards'
                    variant='headlineMedium'
                >
                    {title}
                </Text>
            )}
        </View>
    );
};

interface SectionContainerProps {
    className?: string;
    items?: ItemDto[];
    sectionHeaderProps?: Omit<SectionHeaderProps, 'itemsLength'>;
    scrollerProps?: ScrollerProps;
    itemsContainerProps?: ItemsContainerProps;
    isListMode?: boolean;
    isScrollerMode?: boolean;
    noPadding?: boolean;
    cardOptions?: CardOptions;
    listOptions?: ListOptions;
}

const SectionContainer: FC<PropsWithChildren<SectionContainerProps>> = ({
    className,
    sectionHeaderProps,
    scrollerProps,
    itemsContainerProps,
    isListMode = false,
    isScrollerMode = true,
    noPadding = false,
    items = [],
    cardOptions = {},
    listOptions = {},
    children
}) => {
    const sectionClass = classNames('verticalSection', className);

    const renderItems = () => {
        if (React.isValidElement(children)) {
            return children;
        }

        if (isListMode && !isScrollerMode) {
            return <Lists items={items} listOptions={listOptions} />;
        } else {
            return <Cards items={items} cardOptions={cardOptions} />;
        }
    };

    const content = (
        <ItemsContainer
            className={classNames(
                { scrollSlider: isScrollerMode },
                itemsContainerProps?.className
            )}
            {...itemsContainerProps}
        >
            {renderItems()}
        </ItemsContainer>
    );

    return (
        <View className={sectionClass}>
            {sectionHeaderProps?.title && (
                <SectionHeader
                    className={classNames(
                        { 'no-padding': noPadding },
                        sectionHeaderProps?.className
                    )}
                    itemsLength={items.length}
                    {...sectionHeaderProps}
                />
            )}
            {isScrollerMode && !isListMode ? (
                <Scroller
                    className={classNames(
                        { 'no-padding': noPadding },
                        scrollerProps?.className
                    )}
                    {...scrollerProps}
                >
                    {content}
                </Scroller>
            ) : (
                content
            )}
        </View>
    );
};

export default SectionContainer;
