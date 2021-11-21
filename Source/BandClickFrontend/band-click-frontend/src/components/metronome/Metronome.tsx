import React from "react";

const Metronome = () => {
    return (
        <div>
            <div>
                <input type="text" value="80" />
                <span>Bpm</span>
            </div>
            <div>
                <button>-</button>
                <button>+</button>
            </div>
            <div>
                <button>Start</button>
            </div>
        </div>
    );
}

export { Metronome };
