import React, { useCallback } from 'react';
import classNames from 'classnames';

import { View } from 'react-native';
// TODO: ToggleButton/ToggleButtonGroup need custom implementation

import { LibraryViewSettings } from 'types/library';
import 'components/alphaPicker/style.scss';

interface AlphabetPickerProps {
    className?: string;
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<
        React.SetStateAction<LibraryViewSettings>
    >;
}

const AlphabetPicker: React.FC<AlphabetPickerProps> = ({
    className,
    libraryViewSettings,
    setLibraryViewSettings
}) => {
    const handleValue = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            newValue: string | null | undefined
        ) => {
            setLibraryViewSettings((prevState) => ({
                ...prevState,
                StartIndex: 0,
                Alphabet: newValue
            }));
        },
        [setLibraryViewSettings]
    );

    const containerClassName = classNames(
        'alphaPicker',
        className,
        'alphaPicker-fixed-right'
    );

    const btnClassName = classNames(
        'paper-icon-button-light',
        'alphaPickerButton'
    );

    const letters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <View
            className={containerClassName}
            /* TODO: sx prop needs StyleSheet styling - position: 'fixed', bottom: '1.5em', fontSize responsive */
        >
            <View
                /* TODO: ToggleButton/ToggleButtonGroup need custom implementation */
                /* orientation='vertical' */
                /* value={libraryViewSettings.Alphabet} */
                /* exclusive */
                /* TODO: color prop needs theme color mapping */
                /* size='small' */
                /* onChange={handleValue} */
            >
                {letters.map((l) => (
                    <View
                        key={l}
                        /* value={l} */
                        className={btnClassName}
                        /* TODO: ToggleButton/ToggleButtonGroup need custom implementation */
                    >
                        {l}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default AlphabetPicker;
