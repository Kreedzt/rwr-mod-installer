import React, { FC, useCallback, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import { invoke } from '@tauri-apps/api';
import MessageBar from '../../components/messageBar/MessageBar';
import { useMessageBarRef } from '../../components/messageBar/hooks';
import { ModReadInfo } from './types';

type Step1Props = {
    setLoading: (next: boolean) => void;
    onNext: (path: string, modInfo: ModReadInfo) => void;
};

const Step1: FC<Step1Props> = ({ setLoading, onNext }) => {
    const msgBarRef = useMessageBarRef();

    const selectFile = useCallback(async () => {
        try {
            setLoading(true);
            const selectedPath = await open({
                filters: [
                    {
                        name: 'zip',
                        extensions: ['zip'],
                    },
                    {
                        name: '7z',
                        extensions: ['7z'],
                    },
                ],
            });

            console.log('selectedPath', selectedPath);

            const res = await invoke('read_info', {
                path: selectedPath,
            });

            const modInfo = JSON.parse(res as string) as ModReadInfo;

            console.log('modInfo', modInfo);

            onNext(selectedPath as string, modInfo);
        } catch (e) {
            console.log('on select file error', e);
            msgBarRef.current?.show({
                type: 'error',
                msg: typeof e === 'string' ? e : e.message,
            });
        } finally {
            setLoading(false);
        }
    }, [setLoading, onNext]);

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
            <Button variant="contained" onClick={selectFile}>
                选择打包后的文件
            </Button>
            <MessageBar ref={msgBarRef} />
        </div>
    );
};

export default Step1;
