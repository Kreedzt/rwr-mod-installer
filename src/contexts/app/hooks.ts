import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

export const useAppContext = () => {
    return useContext(AppContext);
};

export const useConfigPath = (): string => {
    const appContext = useAppContext();
    const [cPath, setCPath] = useState<string>('');

    const getPath = useCallback(async () => {
        try {
            const path = await appContext.getConfigPath();
            setCPath(path);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getPath();
    }, []);

    return cPath;
};
