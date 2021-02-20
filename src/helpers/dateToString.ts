export const dateToString = (date: Date | null) => {
    return date ? date.toISOString().slice(0, 10) : ''
}

export const dateToChartText = (date: string) => {
    return new Date(date).toString().slice(4, 10)
}