import React, { FC, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { ModReadInfo } from './types';
import Divider from '@mui/material/Divider';

interface InstallProps {
    //
}

const steps = ['选择 Mod 包', '提取 Mod 信息', '安装'];

const Install: FC<InstallProps> = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [modInfo, setModInfo] = useState<ModReadInfo>();
    const [selectedPath, setSelectedPath] = useState<string>();

    const handleReset = useCallback(() => {
        setActiveStep(0);
    }, []);

    const handleNext = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    const onStep1Next = useCallback((path: string, modInfo: ModReadInfo) => {
        setSelectedPath(path);
        setModInfo(modInfo);
        setActiveStep(1);
    }, []);

    const StepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <Step1 setLoading={setLoading} onNext={onStep1Next} />;
            case 1:
                return (
                    <Step2
                        displayModInfo={modInfo}
                        onNext={handleNext}
                        onPrev={handleBack}
                    />
                );
            case 2:
                return (
                    <Step3
                        loading={loading}
                        filePath={selectedPath}
                        setLoading={setLoading}
                        onReset={handleReset}
                    />
                );
            default:
                return null;
        }
    }, [
        activeStep,
        setLoading,
        onStep1Next,
        modInfo,
        selectedPath,
        loading,
        handleNext,
        handleBack,
        handleReset,
    ]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box p={2}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <Divider />

            <Box p={2}>
                {activeStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        {StepContent}
                        {loading && (
                            <Fade
                                in
                                style={{
                                    transitionDelay: 'progress',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Install;
