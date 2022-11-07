import { useRef } from 'react';
import { MessageBarRef } from './types';

export const useMessageBarRef = () => useRef<null | MessageBarRef>(null);
