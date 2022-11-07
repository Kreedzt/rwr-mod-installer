import React, { FC, useCallback, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { invoke } from '@tauri-apps/api';
import { ModInfo } from './types';

type Step1Props = {
    setLoading: (next: boolean) => void;
};

const Step1: FC<Step1Props> = ({ setLoading }) => {
    const [displayModInfo, setDisplayModInfo] = useState<ModInfo>();

    const selectFile = useCallback(async () => {
        try {
            setLoading(true);
            const selectedPath = await open({
                filters: [
                    {
                        name: 'zip',
                        extensions: ['zip'],
                    },
                ],
            });

            console.log('selectedPath', selectedPath);

            const res = await invoke('read_info', {
                path: selectedPath,
            });
            console.log('res', res);

            const modInfo = JSON.parse(res as string) as ModInfo;

            setDisplayModInfo(modInfo);
        } catch (e) {
            setDisplayModInfo(undefined);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    return (
        <div>
            <Button onClick={selectFile}>选择打包后的文件</Button>
            {displayModInfo && (
                <>
                    <Typography>标题: {displayModInfo.title}</Typography>
                    <Typography>描述: {displayModInfo.description}</Typography>
                    <Typography>版本: {displayModInfo.version}</Typography>
                    <Typography>
                        适配游戏版本: {displayModInfo.game_version}
                    </Typography>
                    <Typography>作者: {displayModInfo.authors}</Typography>
                    <Typography variant="subtitle1">文件列表</Typography>
                    {displayModInfo.file_log_info.map((f, index) => (
                        <Typography variant="subtitle2" key={index}>
                            {f}
                        </Typography>
                    ))}
                </>
            )}
        </div>
    );
};

export default Step1;
