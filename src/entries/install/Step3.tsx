import React, { FC, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppContext } from '../../contexts/app/hooks';
import { invoke } from '@tauri-apps/api';
import MessageBar from '../../components/messageBar/MessageBar';
import { useMessageBarRef } from '../../components/messageBar/hooks';

type Step3Props = {
    loading: boolean;
    setLoading: (next: boolean) => void;
    filePath?: string;
    onReset: () => void;
};

const Step3: FC<Step3Props> = ({ filePath, setLoading, loading, onReset }) => {
    const appContext = useAppContext();
    const messageBarRef = useMessageBarRef();

    const onInstall = useCallback(async () => {
        try {
            setLoading(true);
            await invoke('install_mod', {
                path: filePath,
                targetPath: appContext.configStore?.target_path_folder,
            });
            messageBarRef.current?.show({
                type: 'success',
                msg: '安装成功',
            });
        } catch (e: any) {
            messageBarRef.current?.show({
                type: 'error',
                msg: e,
            });
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [appContext]);

    if (!filePath) {
        return <Typography>未读取到文件路径, 请返回上一步</Typography>;
    }

    if (!appContext.configStore?.target_path_folder) {
        return <Typography>未读取到安装目录, 请去[设置]面板中配置</Typography>;
    }

    return (
        <div>
            <Typography variant="h6">已读取文件路径</Typography>
            <Typography variant="subtitle2">{filePath}</Typography>
            <Box p={1}>
                <Button
                    variant="contained"
                    style={{
                        width: '100%',
                    }}
                    onClick={onInstall}
                    disabled={loading}
                >
                    {loading ? '安装中...' : '安装'}
                </Button>
            </Box>

            <Box p={1}>
                <Button
                    onClick={onReset}
                    variant="contained"
                    style={{
                        width: '100%',
                    }}
                    color="error"
                >
                    重置
                </Button>
            </Box>
            <MessageBar ref={messageBarRef} />
        </div>
    );
};

export default Step3;
