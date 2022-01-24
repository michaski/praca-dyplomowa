import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactDOM, { render } from "react-dom";
import App from "../../App";
import './alerts.css'

interface ErrorAlertProps {
    visible: boolean,
    text: string
}

// export const showAlert = (text: string) => {
//     return (<ErrorAlert visible={true} text={text} />);
// } 

let reference: React.FC<ErrorAlertProps>;

const ErrorAlert: React.FC<ErrorAlertProps> = ({visible, text}) => {
    const [show, setShow] = useState(visible);

    // useEffect(() => {
    //     setShow(visible);
    //     if (visible) {
    //         window.setTimeout(() => {
    //             setShow(false);
    //         }, 7000);
    //     }
    // }, [visible]);
        return (
        <Alert id="error-alert" className={`alert-error text-start d-none`} variant="danger" dismissible onClose={e => {
            document.querySelector("#error-alert")?.classList.toggle('d-none');
            setShow(false);
        }}>
            <Alert.Heading>Błąd</Alert.Heading>
            <p id="error-alert-text">
                {text}
            </p>
        </Alert>
        );
    // return (<Button id="#error-alert-toggle" onClick={_ => setShow(true)}></Button>);
  }

export default ErrorAlert;

export const showAlert = (message: string) => {
    ReactDOM.render(
        <ErrorAlert visible={true} text={message} />,
        document.querySelector('#alert-container')
    );
    (document.querySelector('#error-alert-text') as HTMLParagraphElement).innerText = message;
    document.querySelector("#error-alert")?.classList.toggle('d-none');
};
