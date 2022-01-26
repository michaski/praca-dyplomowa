import { showAlert } from "../../components/alerts/Alert";
import RequestError from "./requestError";
import { RequestErrorStatusCodes } from "./statusCodes";

const handleRequestError = (error: any, displayError: boolean, navigateTo: Function) => {
    if (typeof error === "string") {
        console.error(error);
        showAlert("Wystąpił błąd w komunikacji z serwerem.\nSprawdź wiadomość w konsoli.");
    }
    else if (error instanceof RequestError) {
        let message = '';
        switch (error.statusCode) {
            case RequestErrorStatusCodes.BAD_REQUEST:
                // alert(`Błąd zapytania (400 Bad Request).\nSprawdź wiadomość w konsoli.\n${message}`);
                message = "Błąd.\n";
                break;
            case RequestErrorStatusCodes.UNAUTHORIZED:
                message = "Odmowa dostępu.\n";
                navigateTo("/login");
                break;
            case RequestErrorStatusCodes.FORBIDDEN:
                message = "Nie masz odpowiednich uprawnień.\n";
                break;
            case RequestErrorStatusCodes.NOT_FOUND:
                message = "Nie znaleziono.\n";
                navigateTo("/404");
                break;
            case RequestErrorStatusCodes.SERVER_ERROR:
                message = "Błąd serwera.\n";
                navigateTo("/500");
                break;
            default:
                message = "Wystąpił nieznany błąd.\n";
                break;
        }
        if (displayError) {
            let k1: keyof typeof error.message;
            let errorMessage = error.message;
            if (typeof errorMessage === 'string') {
                message += `${errorMessage}\n`;
            } else {
                for (k1 in errorMessage) {
                    if (typeof errorMessage[k1] === 'object') {
                        let errors: any[] = errorMessage[k1];
                        let k2: keyof typeof errors;
                        for (k2 in errors) {
                            if (typeof errors[k2] === 'object') {
                                console.log(`>> ${k2.toString()}`)
                                console.log(`>> ${errors[k2]}`)
                                message += `\n${k2.toString()}:\n${errors[k2].join('\n')}\n`;
                            }
                        } 
                        continue;
                    }
                    else if (typeof errorMessage[k1] === 'string' && (k1.toString() === 'errorMessage' || k1.toString() === 'error')) {
                        console.log(`<< ${errorMessage[k1]}`)
                        message += `${errorMessage[k1]}`;
                    }
                }
            }
            showAlert(message);
        }
    }
}

export default handleRequestError;
