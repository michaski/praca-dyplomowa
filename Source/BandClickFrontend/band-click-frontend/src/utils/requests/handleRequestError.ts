import RequestError from "./requestError";
import { RequestErrorStatusCodes } from "./statusCodes";

const handleRequestError = (error: any, navigateTo: Function) => {
    if (typeof error === "string") {
        console.error(error);
        alert("Wystąpił błąd w komunikacji z serwerem.\nSprawdź wiadomość w konsoli.");
    }
    else if (error instanceof RequestError) {
        switch (error.statusCode) {
            case RequestErrorStatusCodes.BAD_REQUEST:
                alert("Błąd zapytania (400 Bad Request).\nSprawdź wiadomość w konsoli.")
                break;
            case RequestErrorStatusCodes.UNAUTHORIZED:
                alert("Musisz być zalogowany.");
                navigateTo("/login");
                break;
            case RequestErrorStatusCodes.FORBIDDEN:
                alert("Nie masz odpowiednich uprawnień.");
                break;
            case RequestErrorStatusCodes.NOT_FOUND:
                alert("Nie znaleziono");
                navigateTo("/404");
                break;
            case RequestErrorStatusCodes.SERVER_ERROR:
                alert("Błąd serwera");
                navigateTo("/500");
                break;
            default:
                alert("Wystąpił nieznany błąd.\nSprawdź wiadomość w konsoli.");
                break;
        }
        console.error(error.message);
    }
}

export default handleRequestError;
