import { useHistory } from "react-router";
import { RequestError, RequestErrorStatusCodes } from "./requestError";

const useRequestErrorHandler = (error: any) => {
    //const history = useHistory();
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
                //history.push("/login");
                break;
            case RequestErrorStatusCodes.FORBIDDEN:
                alert("Nie masz odpowiednich uprawnień.");
                break;
            case RequestErrorStatusCodes.NOT_FOUND:
                alert("Nie znaleziono");
                //history.push("/404");
                break;
            case RequestErrorStatusCodes.SERVER_ERROR:
                alert("Błąd serwera");
                //history.push("/500");
                break;
            default:
                alert("Wystąpił nieznany błąd.\nSprawdź wiadomość w konsoli.");
                break;
        }
        console.error(error.message);
    }
}

export default useRequestErrorHandler;
