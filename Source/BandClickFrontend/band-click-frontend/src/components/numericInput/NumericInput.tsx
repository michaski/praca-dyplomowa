import React, { useEffect, useRef, useState } from "react";

interface NumericInputProps {
    value: number,
    minValue: number,
    maxValue: number,
    step: number,
    onValueChange: Function
} 

const NumericInput: React.FC<NumericInputProps> = ({ value, minValue, maxValue, step, onValueChange}) => {
    const [currentValue, setValue] = useState(0);
    const [userInputValue, setUserInputValue] = useState(value.toString());
    const intervalId = useRef(-1);
    const tempoInterval = useRef(value);

    useEffect(() => {
        setValue(value);
        setUserInputValue(value.toString());
    }, [value]);
    
    const increment = () => {
        if (tempoInterval.current + step >= maxValue) {
            setValue(maxValue);
            setUserInputValue(lastValue => maxValue.toString());
            tempoInterval.current = maxValue;
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setUserInputValue(lastValue => {
                const newValue = (parseInt(lastValue) + step);
                tempoInterval.current = newValue;
                return newValue.toString();
            });
        }
    }

    const decrement = () => {
        if (tempoInterval.current - step <= minValue) {
            setValue(minValue);
            setUserInputValue(lastValue => minValue.toString());
            tempoInterval.current = minValue;
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setUserInputValue(lastValue => {
                const newValue = (parseInt(lastValue) - step);
                tempoInterval.current = newValue;
                return newValue.toString();
            });
        }
    }

    const setCustomValue = () => {
        let customValue = parseInt(userInputValue);
        if (customValue === undefined || isNaN(customValue) || customValue === Infinity) {
            setUserInputValue(currentValue.toString());
            return;
        }
        if (customValue > maxValue) {
            customValue = maxValue;
        } else if (customValue < minValue) {
            customValue = minValue;
        }
        setValue(customValue);
        onValueChange(customValue);
    }

    return (
        <div>
            <div>
                <input id="tempo" className="form-control" type="number" value={userInputValue} onChange={e => {
                    setUserInputValue(e.target.value);
                }} 
                onKeyDown={e => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                        setCustomValue();
                    }
                }}
                onBlur={e => {
                    setCustomValue();
                }}/>
            </div>
            <div>
                <button 
                    className="btn btn-outline-dark" 
                    onMouseDown={() => {
                        if (intervalId.current === -1) {
                            decrement();
                            intervalId.current = window.setInterval(decrement, 100);
                        }
                    }}
                    onMouseUp={() => {
                        if (intervalId.current !== -1) {
                            window.clearInterval(intervalId.current);
                            intervalId.current = -1;
                            const newValue = parseInt(userInputValue);
                            setValue(newValue);
                            onValueChange(newValue);
                        }
                    }} >-</button>
                <button 
                    className="btn btn-outline-dark" 
                    onMouseDown={() => {
                        if (intervalId.current === -1) {
                            increment();
                            intervalId.current = window.setInterval(increment, 100);
                        }
                    }}
                    onMouseUp={() => {
                        if (intervalId.current !== -1) {
                            window.clearInterval(intervalId.current);
                            intervalId.current = -1;
                            const newValue = parseInt(userInputValue);
                            setValue(newValue);
                            onValueChange(newValue);
                        }
                    }}>+</button>
            </div>
        </div>
    );
}

export default NumericInput;
