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

    useEffect(() => {
        setValue(value);
        setUserInputValue(value.toString());
    }, [value]);
    
    const increment = () => {
        if (currentValue + step > maxValue) {
            setValue(maxValue);
            setUserInputValue(maxValue.toString());
            // onValueChange(maxValue);
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setValue(lastValue => {
                const newValue = lastValue + step;
                // onValueChange(newValue);
                setUserInputValue(newValue.toString());
                return newValue;
            });
        }
    }

    const decrement = () => {
        if (currentValue - step < minValue) {
            setValue(minValue);
            setUserInputValue(minValue.toString());
            // onValueChange(minValue);
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setValue(lastValue => {
                const newValue = lastValue - step;
                // onValueChange(newValue);
                setUserInputValue(newValue.toString());
                return newValue;
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
        console.log(customValue);
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
                    if (e.code === 'Enter') {
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
                            onValueChange(currentValue);
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
                            onValueChange(currentValue);
                        }
                    }}>+</button>
            </div>
        </div>
    );
}

export default NumericInput;
