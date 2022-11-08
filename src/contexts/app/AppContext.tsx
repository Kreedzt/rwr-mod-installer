import React, {
    createContext,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    BaseDirectory,
    createDir,
    exists,
    readTextFile,
    writeTextFile,
} from '@tauri-apps/api/fs';
import { appDir, delimiter } from '@tauri-apps/api/path';
import { AppConfig, AppContextValue } from './types';
import { CONFIG_FILE_NAME } from '../../constants';

export const AppContext = createContext<AppContextValue>({
    refreshStore: async () => {},
    getConfigPath: async () => ''
});

export const getDefaultConfig = (): AppConfig => {
    return {
        target_path_folder: '',
    };
};

export const AppProvider: FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [configStore, setConfigStore] = useState<AppConfig>();

    const writeConfigToFile = useCallback(async (config: AppConfig) => {
        try {
            await writeTextFile(
                CONFIG_FILE_NAME,
                JSON.stringify(config, null, 2),
                {
                    dir: BaseDirectory.App,
                },
            );
        } catch (e) {
            console.log(e);
        }
    }, []);

    const readFileToConfig = useCallback(async () => {
        try {
            const res = await readTextFile(CONFIG_FILE_NAME, {
                dir: BaseDirectory.App,
            });

            return JSON.parse(res) as AppConfig;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const refreshStore = useCallback(async () => {
        try {
            const currentAppDir = await appDir();
            console.log('appDir', currentAppDir);

            const isDirExists = (await exists(
                currentAppDir,
            )) as unknown as boolean;
            console.log('isDirExists', isDirExists);

            if (!isDirExists) {
                await createDir(currentAppDir);
            }

            const isFileExists = (await exists(CONFIG_FILE_NAME, {
                dir: BaseDirectory.App,
            })) as unknown as boolean;
            console.log('isFileExists', isFileExists);

            if (!isFileExists) {
                const defaultConf = getDefaultConfig();
                await writeConfigToFile(defaultConf);
                setConfigStore(defaultConf);
                return;
            }

            const recordConfig = await readFileToConfig();
            setConfigStore(recordConfig);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getConfigPath = useCallback(async () => {
        const currentAppDir = await appDir();
        return currentAppDir + CONFIG_FILE_NAME;
    }, []);

    useEffect(() => {
        refreshStore();
    }, []);

    const contextValue = useMemo<AppContextValue>(() => {
        return {
            configStore,
            refreshStore,
            getConfigPath
        };
    }, [configStore, refreshStore, getConfigPath]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
