import ICurrency from '../models/currency.model'
import {ISelectOption} from '../components/select'
import {CURRENCY_OPTIONS, SELECT_POSITION} from '../const/currency.const'

export const transformChartGroup = (initialSelectedChartGroup: ICurrency.SelectedChartGroup | null, option: ISelectOption, position: string) => {
    let selectedChartGroup = initialSelectedChartGroup

    switch (position) {
        case SELECT_POSITION.FIRST: {
            if (selectedChartGroup && selectedChartGroup.second && selectedChartGroup.second.value === option.value) {
                selectedChartGroup = {
                    firs: option,
                    second: CURRENCY_OPTIONS.filter((item: ISelectOption) => item.value !== option.value)[0]
                }
            } else {
                selectedChartGroup = {
                    firs: option,
                    second: selectedChartGroup ? selectedChartGroup.second : null
                }
            }
            break
        }
        case SELECT_POSITION.SECOND: {
            if (selectedChartGroup && selectedChartGroup.firs && selectedChartGroup.firs.value === option.value) {
                selectedChartGroup = {
                    firs: CURRENCY_OPTIONS.filter((item: ISelectOption) => item.value !== option.value)[0],
                    second: option
                }
            } else {
                selectedChartGroup = {
                    firs: selectedChartGroup ? selectedChartGroup.firs : null,
                    second: option
                }
            }
            break
        }
        default:
            break
    }

    return selectedChartGroup
}