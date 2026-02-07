import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import React, { type FC } from 'react';
import { View } from 'react-native';

// TODO: MUI styled components not available - need custom styling with StyleSheet
// TODO: Theme-based styling needs manual implementation

interface SearchInputProps {
    label?: string
    value?: string
    onChange?: (text: string) => void
    placeholder?: string
}

const SearchInput: FC<SearchInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    ...props
}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="search" size={24} />
            <TextInput
                placeholder={placeholder || label}
                value={value}
                onChangeText={onChange}
                style={{ flex: 1 }}
                {...props}
            />
        </View>
    );
};

export default SearchInput;
