export interface AppConfig {
    target_path_folder: string;
}

export interface AppContextValue {
    configStore?: AppConfig;
    refreshStore: () => Promise<void>;
    getConfigPath: () => Promise<string>;
}
