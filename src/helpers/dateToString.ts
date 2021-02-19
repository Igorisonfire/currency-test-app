export const dateToString = (date: Date | null) => {
    return date ? date.toISOString().slice(0, 10) : ''
}
