import { showAlert } from "../../components/alerts/Alert";
import RequestError from "./requestError";
import { RequestErrorStatusCodes } from "./statusCodes";

const handleRequestError = (error: any, navigateTo: Function) => {
    if (typeof error === "string") {
        console.error(error);
        alert("Wystąpił błąd w komunikacji z serwerem.\nSprawdź wiadomość w konsoli.");
    }
    else if (error instanceof RequestError) {
        let message = '';
        switch (error.statusCode) {
            case RequestErrorStatusCodes.BAD_REQUEST:
                // alert(`Błąd zapytania (400 Bad Request).\nSprawdź wiadomość w konsoli.\n${message}`);
                message = "Błąd.\n";
                break;
            case RequestErrorStatusCodes.UNAUTHORIZED:
                message = "Musisz być zalogowany.\n";
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
        let errors: any[] = error.message.errors;
        let k: keyof typeof errors;
        for (k in errors) {
            message += `\n${k.toString()}:\n${errors[k].join('\n')}\n`;
        } 
        showAlert(message);
        // console.error(error.message);
    }
}

export default handleRequestError;
