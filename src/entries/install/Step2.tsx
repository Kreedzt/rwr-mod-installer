import React, { FC, useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Markdown from '../../components/markdown/Markdown';
import { ModReadInfo } from './types';
import { DialogContent } from '@mui/material';

type Step2Props = {
    displayModInfo?: ModReadInfo;
    onPrev: () => void;
    onNext: () => void;
};

enum ModalContentMode {
    NODE,
    MARKDOWN,
}

const Step2: FC<Step2Props> = ({ displayModInfo, onNext, onPrev }) => {
    const [modalOpt, setModalOpt] = useState<{
        open: boolean;
        title: string;
        content: string;
    }>({
        open: false,
        title: '',
        content: '',
    });
    const [modalContentMode, setModalContentMode] = useState<ModalContentMode>(
        ModalContentMode.NODE,
    );

    const onShowFileList = useCallback(() => {
        setModalContentMode(ModalContentMode.NODE);
        setModalOpt({
            open: true,
            title: `文件列表(${displayModInfo?.file_log_info.length} 项)`,
            content: '',
        });
    }, [displayModInfo]);

    const onShowReadme = useCallback(() => {
        setModalContentMode(ModalContentMode.MARKDOWN);
        setModalOpt({
            open: true,
            title: '说明文件',
            content: displayModInfo?.readme_content ?? '',
        });
    }, [displayModInfo]);

    const onShowChangelog = useCallback(() => {
        setModalContentMode(ModalContentMode.MARKDOWN);
        setModalOpt({
            open: true,
            title: '版本更新文件',
            content: displayModInfo?.changelog_content ?? '',
        });
    }, [displayModInfo]);

    const onClose = useCallback(() => {
        setModalOpt({
            open: false,
            title: '版本更新文件',
            content: '',
        });
    }, []);

    return (
        <>
            {displayModInfo ? (
                <>
                    <Typography variant="h6">
                        已读取压缩包, 注意核对适配游戏版本
                    </Typography>
                    <Typography>标题: {displayModInfo.title}</Typography>
                    <Typography>描述: {displayModInfo.description}</Typography>
                    <Typography>版本: {displayModInfo.version}</Typography>
                    <Typography>
                        适配游戏版本: {displayModInfo.game_version}
                    </Typography>
                    <Typography>作者: {displayModInfo.authors}</Typography>
                    <Box>
                        <Button onClick={onShowFileList}>
                            文件列表({displayModInfo.file_log_info.length} 项)
                        </Button>
                        <Button onClick={onShowReadme}>说明文件</Button>
                        <Button onClick={onShowChangelog}>版本更新文件</Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={onPrev}
                        >
                            上一步
                        </Button>
                        <Button variant="contained" onClick={onNext}>
                            下一步
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography>
                    尚未选择 Mod 文件, 请
                    <Button onClick={onPrev}>返回上一步</Button>
                </Typography>
            )}
            <Dialog open={modalOpt.open} onClose={onClose}>
                <DialogTitle>{modalOpt.title}</DialogTitle>
                <Divider />
                <DialogContent>
                    {modalContentMode === ModalContentMode.NODE && (
                        <ul>
                            {displayModInfo?.file_log_info.map((f, index) => (
                                <Box component="li" key={index}>
                                    {f}
                                </Box>
                            ))}
                        </ul>
                    )}
                    {modalContentMode === ModalContentMode.MARKDOWN && (
                        <Box p={2}>
                            <Markdown>{modalOpt.content}</Markdown>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Step2;
