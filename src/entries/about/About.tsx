import React, { FC, useCallback, useEffect, useState } from 'react';
import { getName, getVersion } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/api/shell';
import Typography from '@mui/material/Typography';
import { AUTHORS, SOURCE_CODE_URL } from '../../constants';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

interface AboutProps {
    //
}

const About: FC<AboutProps> = () => {
    const [appInfo, setAppInfo] = useState<{
        name: string;
        version: string;
    }>();

    const init = useCallback(async () => {
        try {
            const [name, version] = await Promise.all([
                getName(),
                getVersion(),
            ]);
            setAppInfo({
                name,
                version,
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const openUrl = useCallback(async () => {
        try {
            console.log('open url:', SOURCE_CODE_URL);
            await open(SOURCE_CODE_URL);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        init();
    }, []);

    return (
        <Box>
            <Box p={2}>
                <Typography variant="h5">RWR Mod 安装器</Typography>
            </Box>

            <Divider />

            <Box p={2}>
                <Typography variant="subtitle1">
                    应用名称: {appInfo?.name}
                </Typography>
                <Typography variant="subtitle1">
                    应用版本: {appInfo?.version}
                </Typography>
                <Typography variant="subtitle1">
                    源码地址:
                    <Button variant="text" onClick={openUrl}>
                        点我访问
                    </Button>
                </Typography>
                <Typography variant="subtitle1">
                    作者: {AUTHORS.join(',')}
                </Typography>
            </Box>

            <Divider />

            <Box p={2}>
                <Typography variant="subtitle1">
                    提示：首次使用请去设置面板设置路径
                </Typography>
            </Box>
        </Box>
    );
};

export default About;
