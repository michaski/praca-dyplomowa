import React, { useEffect, useState } from "react";

interface NumericInputProps {
    value: number,
    minValue: number,
    maxValue: number,
    step: number,
    onValueChange: Function
} 

const NumericInput: React.FC<NumericInputProps> = ({ value, minValue, maxValue, step, onValueChange}) => {
    const [currentValue, setValue] = useState(0);

    useEffect(() => {
        setValue(value);
    }, [value]);
    
    const increment = () => {
        if (currentValue + step > maxValue) {
            setValue(maxValue);
            onValueChange(maxValue);
        } else {
            setValue(lastValue => {
                const newValue = lastValue + step;
                onValueChange(newValue);
                return newValue;
            });
        }
    }

    const decrement = () => {
        if (currentValue - step < minValue) {
            setValue(minValue);
            onValueChange(minValue);
        } else {
            setValue(lastValue => {
                const newValue = lastValue - step;
                onValueChange(newValue);
                return newValue;
            });
        }
    }

    return (
        <div>
            <div>
                <input className="form-control" type="number" value={currentValue} onChange={e => {
                    if (e.target.value.trim().length === 0) {
                        setValue(0);
                        return;
                    }
                    let parsedValue = parseInt(e.target.value);
                    if (parsedValue === undefined || isNaN(parsedValue) || parsedValue === Infinity || parsedValue < minValue || parsedValue > maxValue) {
                        return;
                    }
                    if (parsedValue > currentValue) {
                        if (currentValue + step <= maxValue) {
                            parsedValue = currentValue + step;
                        } else {
                            return;
                        }
                    } else if (parsedValue < currentValue) {
                        if (currentValue - step >= minValue) {
                            parsedValue = currentValue - step;
                        } else {
                            return;
                        }
                    }
                    setValue(parsedValue);
                    onValueChange(parsedValue);
                }} />
            </div>
            <div>
                <button 
                    className="btn btn-outline-dark" 
                    onClick={() => decrement()}>-</button>
                <button 
                    className="btn btn-outline-dark" 
                    onClick={() => increment()}>+</button>
            </div>
        </div>
    );
}

export default NumericInput;
