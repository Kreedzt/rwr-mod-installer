import React, { FC, useCallback, useEffect, useState } from 'react';
import { getName, getVersion } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/api/shell';
import Typography from '@mui/material/Typography';
import { AUTHORS, SOURCE_CODE_URL } from '../../constants';
import Button from '@mui/material/Button';

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
        <div>
            <Typography>应用名称: {appInfo?.name}</Typography>
            <Typography>应用版本: {appInfo?.version}</Typography>
            <Typography>
                源码地址:
                <Button onClick={openUrl}>点我访问</Button>
            </Typography>
            <Typography>作者: {AUTHORS.join(',')}</Typography>
        </div>
    );
};

export default About;
