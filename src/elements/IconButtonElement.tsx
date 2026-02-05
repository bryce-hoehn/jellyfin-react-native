import React, { FunctionComponent } from 'react';

import { translate } from 'lib/globalize';

type IProps = {
    is?: string;
    id?: string;
    title?: string;
    className?: string;
    icon?: string,
    dataIndex?: string | number;
    dataTag?: string | number;
    dataProfileid?: string | number;
    onPress?: () => void;
};

const createIconButtonElement = ({ is, id, className, title, icon, dataIndex, dataTag, dataProfileid }: IProps) => ({
    __html: `<button
        is="${is}"
        type="button"
        ${id}
        class="${className}"
        ${title}
        ${dataIndex}
        ${dataTag}
        ${dataProfileid}
    >
        <span class="material-icons ${icon}" aria-hidden="true"></span>
    </button>`
});

const IconButtonElement: FunctionComponent<IProps> = ({ is, id, className, title, icon, dataIndex, dataTag, dataProfileid, onPress }: IProps) => {
    const button = createIconButtonElement({
        is: is,
        id: id ? `id="${id}"` : '',
        className: className,
        title: title ? `title="${translate(title)}"` : '',
        icon: icon,
        dataIndex: (dataIndex || dataIndex === 0) ? `data-index="${dataIndex}"` : '',
        dataTag: dataTag ? `data-tag="${dataTag}"` : '',
        dataProfileid: dataProfileid ? `data-profileid="${dataProfileid}"` : ''
    });

    if (onPress !== undefined) {
        return (
            <button
                style={{ all: 'unset' }}
                dangerouslySetInnerHTML={button}
                onPress={onPress}
            />
        );
    }

    return (
        <div
            dangerouslySetInnerHTML={button}
        />
    );
};

export default IconButtonElement;
