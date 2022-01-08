const context = new Map();

export const getAction = <T extends any>(Action: new () => T): T => {
    if (context.has(Action)) {
        return context.get(Action);
    }

    const action = new Action();
    context.set(Action, action);
    return action;
}
