import ICurrency from '../models/currency.model'

export const sortDataByDate = (arr: ICurrency.ModelLocal[]) => {
    return arr.sort((a: ICurrency.ModelLocal, b: ICurrency.ModelLocal) => b.timestamp - a.timestamp)
}