import React, { useEffect, useState } from "react";
import { Container, Form, ProgressBar } from "react-bootstrap";

interface AutoSwitchProps {
    onToggle: Function;
    totalBars: number,
    barsFinished: number
    onSwitchRequested: Function
}

const AutoSwitch: React.FC<AutoSwitchProps> = ({onToggle, totalBars, barsFinished, onSwitchRequested}) => {
    const [isOn, setIsOn] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculatedProgress = (barsFinished/totalBars) * 100;
        setProgress(calculatedProgress);
        if (isOn && calculatedProgress >= 100) {
            onSwitchRequested();
        }
    }, [totalBars, barsFinished]);

    return (
    <>
    <Container className="d-flex justify-content-center m-2">
    <Form>
        <Form.Check 
            checked={isOn}
            type="switch"
            label="Automatyczna zmiana"
            onChange={e => {
                setIsOn(!isOn);
                onToggle(!isOn);
            }}
        />
    </Form>
    </Container>
    <Container className="mb-2">
        {
            isOn &&
            <ProgressBar className="auto-switch-progress" now={progress} label={`${barsFinished}/${totalBars}`} />
        }
    </Container>
    </>
    );
}

export default AutoSwitch;
