import React, { FC, useCallback } from 'react';
import { useAppContext, useConfigPath } from '../../contexts/app/hooks';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { open as shellOpen } from '@tauri-apps/api/shell';
import { open as dialogOpen } from '@tauri-apps/api/dialog';
import { writeText } from '@tauri-apps/api/clipboard';

interface ConfigProps {
    //
}

const Config: FC<ConfigProps> = () => {
    const appContext = useAppContext();
    const configPath = useConfigPath();

    const onOpenConfigFile = useCallback(async () => {
        try {
            console.log('configPath:', configPath);
            await shellOpen(configPath);
        } catch (e) {
            console.log(e);
        }
    }, [configPath]);

    const onCopyConfigPath = useCallback(async () => {
        try {
            console.log('configPath:', configPath);
            await writeText(configPath);
        } catch (e) {
            console.log(e);
        }
    }, [configPath]);

    const onSelectTargetFolder = useCallback(async () => {
        try {
            const selectedPath = await dialogOpen({
                directory: true,
            });

            if (selectedPath) {
                await appContext.updateStore({
                    ...appContext.configStore,
                    target_path_folder: selectedPath as string,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }, [appContext.updateStore]);

    return (
        <Box p={2}>
            <Box p={2}>
                <Card>
                    <CardHeader title="使用外部软件来编辑" />
                    <CardContent>
                        <Button onClick={onOpenConfigFile}>打开配置文件</Button>
                        <Button onClick={onCopyConfigPath}>
                            复制配置目录路径
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            <Box p={2}>
                <Card>
                    <CardHeader title="设置区域" />
                    <CardContent>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    onClick={onSelectTargetFolder}
                                >
                                    点我设置目标目录(通常用 RWR 游戏目录, 即:
                                    RunningWithRifles 文件夹)
                                </Button>
                                <Typography variant="body2">
                                    {appContext.configStore
                                        ?.target_path_folder ? (
                                        <>
                                            目标目录已设置为:{' '}
                                            {
                                                appContext.configStore
                                                    .target_path_folder
                                            }
                                        </>
                                    ) : (
                                        '尚未进行设置'
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Config;
