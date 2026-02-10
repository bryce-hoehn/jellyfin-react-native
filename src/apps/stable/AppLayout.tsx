import React from 'react';
import { Slot } from 'expo-router';

import AppBody from 'components/AppBody';
import CustomCss from 'components/CustomCss';
import ThemeCss from 'components/ThemeCss';

export default function AppLayout() {
    return (
        <>
            <AppBody>
                <Slot />
            </AppBody>
            <ThemeCss />
            <CustomCss />
        </>
    );
}
