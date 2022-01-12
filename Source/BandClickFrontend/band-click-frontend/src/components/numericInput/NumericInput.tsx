import React, { useState } from "react";

interface NumericInputProps {
    defaultValue: number,
    minValue: number,
    maxValue: number,
    step: number,
    onValueChange: Function
} 

const NumericInput: React.FC<NumericInputProps> = ({defaultValue, minValue, maxValue, step, onValueChange}) => {
    const [value, setValue] = useState(defaultValue);
    
    const increment = () => {
        if (value + step > maxValue) {
            setValue(maxValue);
        } else {
            setValue(value + step);
        }
        onValueChange(value);
    }

    const decrement = () => {
        if (value - step < minValue) {
            setValue(minValue);
        } else {
            setValue(value - step);
        }
        onValueChange(value);
    }

    return (
        <div>
            <div>
                <input className="form-control" type="number" defaultValue={defaultValue} value={value} onChange={e => {
                    if (e.target.value.trim().length === 0) {
                        setValue(0);
                        return;
                    }
                    let parsedValue = parseInt(e.target.value);
                    if (parsedValue === undefined || isNaN(parsedValue) || parsedValue === Infinity || parsedValue < minValue || parsedValue > maxValue) {
                        return;
                    }
                    setValue(parseInt(e.target.value));
                    onValueChange(value);
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
