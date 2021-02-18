namespace ICurrency {
    export interface ModelApi {
        date: string
        historical: boolean
        privacy: string
        quotes: Quotes
        source: string
        success: boolean
        terms: string
        timestamp: number
    }

    export interface ModelLocal {
        date: string,
        quotes: NewQuotes,
        timestamp: number
    }

    export interface Quotes {
        USDEUR: number,
        USDUSD: number,
        USDCHF: number
    }

    export interface NewQuotes {
        USDEUR: number,
        USDCHF: number,
        EURCHF: number,
    }
}

export default ICurrency;
