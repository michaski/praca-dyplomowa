import React from "react"

const Playlist = () => {
    return (
        <div className="col-md-4">
            <h1>Playlista</h1>
            <button className="btn btn-warning">Ustawienia</button>
            <ul>
                <li>
                    Setting 1
                    <button className="btn btn-sm btn-warning">Opcje</button>
                    <button className="btn btn-sm btn-success">Przenieś</button>
                    <button className="btn btn-sm btn-danger">Usuń</button>
                </li>
                <li>
                    Setting 2
                </li>
                <li>
                    Setting 3
                </li>
            </ul>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="autoSwitchCheck" />
                <label className="form-check-label" htmlFor="autoSwitchCheck">Automatyczna zmiana</label>
            </div>
        </div>
    );
}

export default Playlist;
