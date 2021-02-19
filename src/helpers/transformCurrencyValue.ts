export const transformCurrencyValue = (value: number) => {
    return value ? value.toFixed(3).toString() : ''
}