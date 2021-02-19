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
        quotes: Quotes,
        timestamp: number
    }

    export interface Quotes {
        USDEUR: number,
        USDUSD: number,
        USDCHF: number
    }

    export interface ConvertedValues {
        usdValue: string
        eurValue: string
        chfValue: string
    }

    export interface ChartDataSegment {
        date: string,
        value: number
    }
}

export default ICurrency;
