import React, { useCallback } from 'react';
import { Snackbar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: size prop not available on React Native Paper IconButton (was 'small')
// TODO: color prop not available on React Native Paper IconButton (was 'inherit')
// TODO: autoHideDuration prop may have different behavior in React Native Paper (was 3300)

interface ToastProps {
    visible: boolean
    onDismiss?: () => void
    children?: React.ReactNode
    duration?: number
}

const Toast = (props: ToastProps) => {
    const onCloseClick = useCallback(() => {
        props.onDismiss?.();
    }, [ props ]);

    const action = (
        <IconButton
            icon={() => <Icon name="close" size={20} />}
            onPress={onCloseClick}
        />
    );

    return (
        <Snackbar
            visible={props.visible}
            onDismiss={props.onDismiss}
            duration={props.duration || 3300}
            action={action}
        >
            {props.children}
        </Snackbar>
    );
};

export default Toast;
