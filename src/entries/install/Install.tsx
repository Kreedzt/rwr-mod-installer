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
import { ModInfo } from './types';

interface InstallProps {
    //
}

const steps = ['选择 Mod 包', '提取 Mod 信息', '安装'];

const Install: FC<InstallProps> = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [modInfo, setModInfo] = useState<ModInfo>();

    const handleReset = useCallback(() => {
        setActiveStep(0);
    }, []);

    const handleNext = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    const onStep1Next = useCallback((modInfo: ModInfo) => {
        setModInfo(modInfo);
        setActiveStep(1);
    }, []);

    const StepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <Step1 setLoading={setLoading} onNext={onStep1Next} />;
            case 1:
                return <Step2 displayModInfo={modInfo} />;
            case 2:
                return <Step3 setLoading={setLoading} />;
            default:
                return null;
        }
    }, [activeStep, setLoading, onStep1Next, modInfo]);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </>
            ) : (
                <>
                    {StepContent}
                    {loading ? (
                        <Fade
                            in
                            style={{
                                transitionDelay: 'progress',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress />
                        </Fade>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                返回
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1
                                    ? '完成'
                                    : '下一步'}
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default Install;
