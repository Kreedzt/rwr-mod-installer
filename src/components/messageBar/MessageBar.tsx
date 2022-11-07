import React, {
    FC,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';
import { MessageBarOpt, MessageBarRef } from './types';

type MessageBarProps = {
    duration?: number;
};

const DEFAULT_DURATION: number = 4000;

const MessageBar = forwardRef<MessageBarRef, MessageBarProps>(
    ({ duration }, ref) => {
        const [open, setOpen] = useState(false);
        const [opt, setOpt] = useState<MessageBarOpt>({
            type: 'success',
            msg: '',
        });

        const onClose = useCallback(
            (event?: React.SyntheticEvent | Event, reason?: string) => {
                if (reason === 'clickaway') {
                    return;
                }

                setOpen(false);
            },
            [],
        );

        useImperativeHandle(
            ref,
            () => {
                return {
                    show: (opt1) => {
                        setOpt(opt1);
                        setOpen(true);
                    },
                    hide: onClose,
                };
            },
            [onClose],
        );

        const autoHideDuration = duration ?? DEFAULT_DURATION;

        return (
            <Snackbar
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert
                    onClose={onClose}
                    severity={opt.type}
                    sx={{ width: '100%' }}
                >
                    {opt.msg}
                </Alert>
            </Snackbar>
        );
    },
);

export default MessageBar;
