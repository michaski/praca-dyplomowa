import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Container, Form, Row, Col } from "react-bootstrap";
import './numericInput.css';

interface NumericInputProps {
    value: number,
    minValue: number,
    maxValue: number,
    step: number,
    multiply?: boolean,
    onValueChange: Function
} 

const NumericInput: React.FC<NumericInputProps> = ({ value, minValue, maxValue, step, multiply, onValueChange}) => {
    const [currentValue, setValue] = useState(0);
    const [userInputValue, setUserInputValue] = useState(value.toString());
    const intervalId = useRef(-1);
    const tempoInterval = useRef(value);

    useEffect(() => {
        setValue(value);
        setUserInputValue(value.toString());
    }, [value]);
    
    const increment = () => {
        let incrementValue = tempoInterval.current;
        if (multiply) {
            incrementValue *= step;
        } else {
            incrementValue += step;
        }
        if (incrementValue >= maxValue) {
            setValue(maxValue);
            setUserInputValue(lastValue => maxValue.toString());
            tempoInterval.current = maxValue;
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setUserInputValue(lastValue => {
                const newValue = incrementValue;
                tempoInterval.current = newValue;
                return newValue.toString();
            });
        }
        // if (tempoInterval.current + step >= maxValue) {
        //     setValue(maxValue);
        //     setUserInputValue(lastValue => maxValue.toString());
        //     tempoInterval.current = maxValue;
        //     if (intervalId.current !== -1) {
        //         window.clearInterval(intervalId.current);
        //         intervalId.current = -1;
        //     }
        // } else {
        //     setUserInputValue(lastValue => {
        //         const newValue = (parseInt(lastValue) + step);
        //         tempoInterval.current = newValue;
        //         return newValue.toString();
        //     });
        // }
    }

    const decrement = () => {
        let decrementValue = tempoInterval.current;
        if (multiply) {
            decrementValue /= step;
        } else {
            decrementValue -= step;
        }
        if (decrementValue <= minValue) {
            setValue(minValue);
            setUserInputValue(lastValue => minValue.toString());
            tempoInterval.current = minValue;
            if (intervalId.current !== -1) {
                window.clearInterval(intervalId.current);
                intervalId.current = -1;
            }
        } else {
            setUserInputValue(lastValue => {
                const newValue = decrementValue;
                tempoInterval.current = newValue;
                return newValue.toString();
            });
        }
        // if (tempoInterval.current - step <= minValue) {
        //     setValue(minValue);
        //     setUserInputValue(lastValue => minValue.toString());
        //     tempoInterval.current = minValue;
        //     if (intervalId.current !== -1) {
        //         window.clearInterval(intervalId.current);
        //         intervalId.current = -1;
        //     }
        // } else {
        //     setUserInputValue(lastValue => {
        //         const newValue = (parseInt(lastValue) - step);
        //         tempoInterval.current = newValue;
        //         return newValue.toString();
        //     });
        // }
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
        <Container className="d-flex numericInput justify-content-center mb-2">
            <Form.Control type="number" id="tempo" className="number me-2 text-center" value={userInputValue} onChange={e => {
                setUserInputValue(e.target.value);
            }} 
            onKeyDown={e => {
                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                    setCustomValue();
                }
            }}
            onBlur={e => {
                setCustomValue();
            }} />
            <ButtonGroup size="sm" className="d-flex flex-column text-center">
                <Button variant="" className="numeric-input-button mb-1 border"
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
                    }}
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </Button>
                <Button variant="" className="numeric-input-button border"
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
                    }}
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default NumericInput;
