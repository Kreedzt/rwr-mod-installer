import React, { FC, useCallback, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MessageBar from '../../components/messageBar/MessageBar';
import { useMessageBarRef } from '../../components/messageBar/hooks';
import { ModInfo } from '../install/types';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import './Bundle.less';

interface BundleProps {
    //
}

const CONFIG_EXAMPLE: ModInfo = {
    title: 'Mod 标题',
    description: 'Mod 描述',
    authors: ['Annoymous'],
    version: '0.1.0',
    game_version: '1.95',
};

const Bundle: FC<BundleProps> = () => {
    const [loading, setLoading] = useState(false);

    const msgBarRef = useMessageBarRef();

    const onBundle = useCallback(async () => {
        try {
            setLoading(true);
            const selectedPath = await open({
                directory: true,
            });

            console.log('selectedPath', selectedPath);
            // Remote Call Rust Fn
            const res = await invoke('bundle_mod', {
                path: selectedPath,
            });

            console.log('res', res);

            const total_path = `${selectedPath}\\${res}`;
            msgBarRef.current?.show({
                type: 'success',
                msg: `已打包，输出路径为:【${total_path}】`,
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
    }, []);

    const onGenerateConfig = useCallback(async () => {
        try {
            setLoading(true);
            const selectedPath = await open({
                directory: true,
            });

            console.log('selectedPath', selectedPath);
            // Remote Call Rust Fn
            const res = await invoke('generate_mod_config', {
                path: selectedPath,
            });

            console.log('res', res);

            msgBarRef.current?.show({
                type: 'success',
                msg: `已为【${res}】目录生成默认配置`,
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
    }, []);

    return (
        <Box className="bundle-container">
            <Box p={2}>
                <Typography variant="h5">
                    将 Mod 包打包成可供安装的 7z 文件
                </Typography>
            </Box>

            <Divider />

            <Box mt={2} mb={2}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="contained" onClick={onBundle}>
                            打包
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="warning"
                            variant="contained"
                            onClick={onGenerateConfig}
                        >
                            生成默认配置文件
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={2} mb={2} mr={2}>
                <Card>
                    <CardHeader title="结构说明(以下结构缺一不可)" />
                    <CardContent>
                        <Typography component="ul" variant="body2">
                            <Box component="li">
                                media/(Mod 资源包, 作为文件夹存在)
                            </Box>
                            <Box component="li">README.md(使用说明文件)</Box>
                            <Box component="li">CHANGELOG.md(改动说明文件)</Box>
                            <Box component="li">config.json(配置文件)</Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box mt={2} mb={2} mr={2}>
                <Card>
                    <CardHeader title="额外说明" />
                    <CardContent>
                        <Box mb={2}>
                            <Typography variant="subtitle2">
                                config.json 格式说明(以下结构缺一不可):
                            </Typography>
                            <Typography component="ul" variant="body2">
                                <Box component="li">title: Mod 标题</Box>
                                <Box component="li">description: Mod 描述</Box>
                                <Box component="li">authors: Mod 作者列表</Box>
                                <Box component="li">version: Mod 版本</Box>
                                <Box component="li">
                                    game_version: 适配的游戏版本
                                </Box>
                            </Typography>

                            <Typography variant="subtitle2">
                                JSON 结构示例:
                            </Typography>
                            <Typography variant="body2">
                                <code>
                                    <pre>
                                        {JSON.stringify(
                                            CONFIG_EXAMPLE,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </code>
                            </Typography>
                        </Box>

                        <Divider />

                        <Box mt={2}>
                            <Typography variant="subtitle2">
                                .md 后缀的文件为 Markdown 语法文件,
                                可以编写一定格式的文本
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Box mt={2} mb={2} mr={2}>
                <Card>
                    <CardHeader title="工作原理" />
                    <CardContent>
                        <Typography component="ol" variant="body2">
                            <Box component="li">解压文件，识别结构</Box>
                            <Box component="li">
                                读取 config.json 内包信息(版本, 名称等)
                            </Box>
                            <Box component="li">
                                读取 README.md 作为说明文件
                            </Box>
                            <Box component="li">
                                读取 CHANGELOG.md 作为改动说明文件
                            </Box>
                            <Box component="li">
                                用户点击安装，开始复制 media
                                文件夹到游戏指定目录中作为替换
                            </Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <MessageBar ref={msgBarRef} />
        </Box>
    );
};

export default Bundle;
