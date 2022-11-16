export interface ModInfo {
    title: string;
    description: string;
    authors: string[];
    version: string;
    game_version: string;
}

export interface ModReadInfo extends ModInfo {
    file_log_info: string[];
    file_path_list: string[];
    readme_content: string;
    changelog_content: string;
}
