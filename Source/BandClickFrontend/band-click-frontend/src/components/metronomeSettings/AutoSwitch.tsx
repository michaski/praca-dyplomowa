import React, { useEffect, useState } from "react";
import { Form, ProgressBar } from "react-bootstrap";

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
    {
        isOn &&
        <ProgressBar now={progress} label={`${barsFinished}/${totalBars}`} />
    }
    </>
    );
}

export default AutoSwitch;
