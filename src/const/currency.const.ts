import {ISelectOption} from '../components/select'

export const CURRENCY_NAME = {
    USD: 'USD',
    EUR: 'EUR',
    CHF: 'CHF',
}

export const CURRENCY_OPTION = {
    USD: {value: 'USD', label: 'USD'},
    EUR: {value: 'EUR', label: 'EUR'},
    CHF: {value: 'CHF', label: 'CHF'},
}

export const CURRENCY_OPTIONS: ISelectOption[] = [
    CURRENCY_OPTION.USD,
    CURRENCY_OPTION.EUR,
    CURRENCY_OPTION.CHF
]

export const SELECT_POSITION = {
    FIRST: 'FIRST',
    SECOND: 'SECOND'
}