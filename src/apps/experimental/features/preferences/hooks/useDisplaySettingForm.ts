import { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import toast from 'components/toast/toast';
import { translate } from 'lib/globalize';

import type { DisplaySettingsValues } from '../types/displaySettingsValues';
import { useDisplaySettings } from './useDisplaySettings';

type UpdateField = {
    name: keyof DisplaySettingsValues;
    value: string | boolean;
};

export function useDisplaySettingForm() {
    const urlParams = useLocalSearchParams();
    const userId = typeof urlParams.userId === 'string' ? urlParams.userId : undefined;
    const {
        displaySettings,
        loading,
        saveDisplaySettings
    } = useDisplaySettings({ userId });
    const [formValues, setFormValues] = useState<DisplaySettingsValues>();

    useEffect(() => {
        if (!loading && displaySettings && !formValues) {
            setFormValues(displaySettings);
        }
    }, [formValues, loading, displaySettings]);

    const updateField = useCallback(({ name, value }: UpdateField) => {
        if (formValues) {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    }, [formValues, setFormValues]);

    const submitChanges = useCallback(async () => {
        if (formValues) {
            await saveDisplaySettings(formValues);
            toast(translate('SettingsSaved'));
        }
    }, [formValues, saveDisplaySettings]);

    return {
        loading,
        values: formValues,
        submitChanges,
        updateField
    };
}
