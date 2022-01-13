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
        } else {
            setValue(currentValue + step);
        }
        onValueChange(currentValue);
    }

    const decrement = () => {
        if (currentValue - step < minValue) {
            setValue(minValue);
        } else {
            setValue(currentValue - step);
        }
        onValueChange(currentValue);
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
                    setValue(parsedValue);
                    onValueChange(parsedValue);
                }} />
            </div>
            <div>
                <button className="btn btn-outline-dark" onClick={() => decrement()}>-</button>
                <button className="btn btn-outline-dark" onClick={() => increment()}>+</button>
            </div>
        </div>
    );
}

export default NumericInput;
