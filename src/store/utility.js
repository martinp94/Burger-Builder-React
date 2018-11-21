export const updatedObject = (oldState, newValues) => {
    return {
        ...oldState,
        ...newValues
    }
}