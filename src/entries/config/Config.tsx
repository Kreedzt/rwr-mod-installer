import React, { FC } from 'react';
import { useAppContext, useConfigPath } from '../../contexts/app/hooks';
import Typography from '@mui/material/Typography';

interface ConfigProps {
    //
}

const Config: FC<ConfigProps> = () => {
    const appContext = useAppContext();
    const configPath = useConfigPath();

    return (
        <div>
            <Typography>配置文件路径: {configPath}</Typography>
        </div>
    );
};

export default Config;
