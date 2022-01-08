import React from 'react';
import { getAction } from '../store/actions';

export const useAction = <T>(Action: new () => T) => {
    const { current } = React.useRef(getAction(Action));
    return current;
}
