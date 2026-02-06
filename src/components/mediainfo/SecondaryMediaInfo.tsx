import React, { type FC } from 'react';
import classNames from 'classnames';
import { View } from 'react-native';
import useSecondaryMediaInfo from './useSecondaryMediaInfo';
import useIndicator from 'components/indicators/useIndicator';
import MediaInfoItem from './MediaInfoItem';
import type { ItemDto } from 'types/base/models/item-dto';
import { MiscInfo } from 'types/mediaInfoItem';
import type { SecondaryInfoOpts } from './type';

interface SecondaryMediaInfoProps extends SecondaryInfoOpts {
    className?: string;
    infoclass?: string;
    item: ItemDto;
    showTimerIndicatorInfo?: boolean;
}

const SecondaryMediaInfo: FC<SecondaryMediaInfoProps> = ({
    className,
    infoclass,
    item,
    showProgramTimeInfo,
    showStartDateInfo,
    showChannelNumberInfo,
    showChannelInfo,
    channelInteractive,
    showTimerIndicatorInfo = false
}) => {
    const miscInfo = useSecondaryMediaInfo({
        item,
        showProgramTimeInfo,
        showStartDateInfo,
        showChannelNumberInfo,
        showChannelInfo,
        channelInteractive
    });

    const indicator = useIndicator(item);

    const cssClass = classNames(className);

    const renderMediaInfo = (info: MiscInfo, index: number) => (
        <MediaInfoItem key={index} className={infoclass} miscInfo={info} />
    );

    return (
        <View className={cssClass}>
            {miscInfo.map((info, index) => renderMediaInfo(info, index))}

            {showTimerIndicatorInfo !== false && indicator.getTimerIndicator()}
        </View>
    );
};

export default SecondaryMediaInfo;
