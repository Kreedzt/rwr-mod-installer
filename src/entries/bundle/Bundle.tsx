import React, { FC, useCallback, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MessageBar from '../../components/messageBar/MessageBar';
import { useMessageBarRef } from '../../components/messageBar/hooks';

interface BundleProps {
    //
}

const Bundle: FC<BundleProps> = () => {
    const [loading, setLoading] = useState(false);

    const msgBarRef = useMessageBarRef();

    const selectFolder = useCallback(async () => {
        try {
            setLoading(true);
            const selectedPath = await open({
                directory: true,
            });

            console.log('selectedPath', selectedPath);
            const res = await invoke('bundle', {
                path: selectedPath,
            });

            console.log('res', res);

            const total_path = `${selectedPath}\\${res}`;
            msgBarRef.current?.show({
                type: 'success',
                msg: `已打包，输出路径为:${total_path}`
            });
        } catch (e: any) {
            console.log(e);
            msgBarRef.current?.show({
                type: 'error',
                msg: typeof e === 'string' ? e : e.message,
            });
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5">
                将文件包打包成可供安装的 zip 文件
            </Typography>
            <Typography variant="subtitle2">
                结构说明(以下结构缺一不可):
                <ul>
                    <li>media/(Mod 资源包, 作为文件夹存在)</li>
                    <li>README.md(使用说明文件)</li>
                    <li>CHANGELOG.md(改动说明文件)</li>
                    <li>config.json(配置文件)</li>
                </ul>
            </Typography>
            <Typography variant="subtitle2">
                工作原理:
                <ol>
                    <li>解压文件，识别结构</li>
                    <li>读取 config.json 内包信息(版本, 名称等)</li>
                    <li>读取 README.md 作为说明文件</li>
                    <li>读取 CHANGELOG.md 作为改动说明文件</li>
                    <li>
                        用户点击安装，开始复制 media
                        文件夹到游戏指定目录中作为替换{' '}
                    </li>
                </ol>
            </Typography>
            <Button onClick={selectFolder}>点我选择文件夹打包</Button>
            <MessageBar ref={msgBarRef} />
        </Box>
    );
};

export default Bundle;
