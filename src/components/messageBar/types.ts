import { AlertColor } from '@mui/material/Alert';

export interface MessageBarOpt {
    type: AlertColor;
    msg: string;
}

export interface MessageBarRef {
    show: (opt: MessageBarOpt) => void;
    hide: () => void;
}
