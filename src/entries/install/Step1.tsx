import React, { FC, useCallback, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { invoke } from '@tauri-apps/api';
import { ModInfo } from './types';
import Box from '@mui/material/Box/Box';

type Step1Props = {
    setLoading: (next: boolean) => void;
    onNext: (modInfo: ModInfo) => void;
};

const Step1: FC<Step1Props> = ({ setLoading, onNext }) => {
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

            onNext(modInfo);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    return (
        <div>
            <Box className="tutorial">
                <Box>
                    <Typography variant="h6">说明</Typography>
                </Box>
                <ol>
                    <li>
                        本安装器只识别使用本安装器 "打包" 的 Mod,
                        请不要使用第三方软件擅自压缩 zip 进行安装
                    </li>
                    <li>
                        使用本安装器打包的 Mod 文件名通常为此格式:
                        <Typography variant="subtitle1">
                            [RWRMI][1.95]*** v0.1.0.zip
                        </Typography>
                    </li>
                    <li>
                        Mod 信息全部由作者提供, 本程序只负责提取信息, 具体 Mod
                        效果应咨询作者
                    </li>
                </ol>
            </Box>
            <Button onClick={selectFile}>选择打包后的文件</Button>
        </div>
    );
};

export default Step1;
