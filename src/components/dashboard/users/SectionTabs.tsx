import React, { FunctionComponent } from 'react';

import { translate } from 'lib/globalize';
import { navigate } from '../../../utils/dashboard';
import LinkButton from '../../../elements/emby-button/LinkButton';

type IProps = {
    activeTab: string;
};

function useNavigate(url: string): () => void {
    return React.useCallback(() => {
        navigate(url, true).catch(err => {
            console.warn('Error navigating to dashboard url', err);
        });
    }, [url]);
}

const SectionTabs: FunctionComponent<IProps> = ({ activeTab }: IProps) => {
    const onPressProfile = useNavigate('/dashboard/users/profile');
    const onPressAccess = useNavigate('/dashboard/users/access');
    const onPressParentalControl = useNavigate('/dashboard/users/parentalcontrol');
    const clickPassword = useNavigate('/dashboard/users/password');
    return (
        <div
            data-role='controlgroup'
            data-type='horizontal'
            className='localnav'>
            <LinkButton
                href='#'
                data-role='button'
                className={activeTab === 'useredit' ? 'ui-btn-active' : ''}
                onPress={onPressProfile}>
                {translate('Profile')}
            </LinkButton>
            <LinkButton
                href='#'
                data-role='button'
                className={activeTab === 'userlibraryaccess' ? 'ui-btn-active' : ''}
                onPress={onPressAccess}>
                {translate('TabAccess')}
            </LinkButton>
            <LinkButton
                href='#'
                data-role='button'
                className={activeTab === 'userparentalcontrol' ? 'ui-btn-active' : ''}
                onPress={onPressParentalControl}>
                {translate('TabParentalControl')}
            </LinkButton>
            <LinkButton
                href='#'
                data-role='button'
                className={activeTab === 'userpassword' ? 'ui-btn-active' : ''}
                onPress={clickPassword}>
                {translate('HeaderPassword')}
            </LinkButton>
        </div>
    );
};

export default SectionTabs;
