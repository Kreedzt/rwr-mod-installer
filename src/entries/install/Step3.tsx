import React, { FC, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAppContext } from '../../contexts/app/hooks';
import { invoke } from '@tauri-apps/api';
import MessageBar from '../../components/messageBar/MessageBar';
import { useMessageBarRef } from '../../components/messageBar/hooks';
import './Step3.less';
import { ModReadInfo } from './types';
import Divider from '@mui/material/Divider';

type Step3Props = {
    loading: boolean;
    setLoading: (next: boolean) => void;
    modInfo?: ModReadInfo;
    filePath?: string;
    onReset: () => void;
};

const Step3: FC<Step3Props> = ({
    filePath,
    modInfo,
    setLoading,
    loading,
    onReset,
}) => {
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
    }, [appContext, filePath]);

    const onBackup = useCallback(async () => {
        try {
            setLoading(true);
            console.log('make_backup params', {
                // mod file path
                modPath: filePath,
                targetPath: appContext.configStore?.target_path_folder,
                fileList: modInfo?.file_path_list ?? [],
            });
            const resPath = await invoke('make_backup', {
                modPath: filePath,
                fileList: modInfo?.file_path_list ?? [],
                targetPath: appContext.configStore?.target_path_folder,
            });
            console.log('resPath', resPath);
            messageBarRef.current?.show({
                type: 'success',
                msg: `备份成功, 已备份到:${resPath}`,
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
    }, [filePath, modInfo, appContext]);

    const onRecover = useCallback(async () => {
        try {
            setLoading(true);
            await invoke('recover_backup', {
                path: appContext.configStore?.target_path_folder,
            });
            messageBarRef.current?.show({
                type: 'success',
                msg: '还原备份成功',
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
        <div className="step3-container">
            <Typography variant="h6">已读取文件路径</Typography>
            <Typography variant="subtitle2">{filePath}</Typography>
            <Box p={1}>
                <Button
                    className="full-width-button"
                    variant="contained"
                    onClick={onInstall}
                    disabled={loading}
                >
                    {loading ? '安装中...' : '安装'}
                </Button>
            </Box>

            <Box p={1}>
                <Button
                    className="full-width-button"
                    onClick={onReset}
                    variant="contained"
                    color="error"
                >
                    重置
                </Button>
            </Box>
            <Divider />
            <Box p={1}>
                <Button
                    color="success"
                    className="full-width-button"
                    variant="contained"
                    onClick={onBackup}
                >
                    备份
                </Button>
            </Box>
            <Box p={1}>
                <Button
                    color="warning"
                    className="full-width-button"
                    variant="contained"
                    onClick={onRecover}
                >
                    还原
                </Button>
            </Box>
            <Typography variant="subtitle2">
                备份仅支持保留一份备份，二次备份会覆盖，在测试 Mod 时请逐一测试
            </Typography>
            <MessageBar ref={messageBarRef} />
        </div>
    );
};

export default Step3;
