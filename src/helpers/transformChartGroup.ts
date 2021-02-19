import ICurrency from '../models/currency.model'
import {ISelectOption} from '../components/select'
import {SELECT_POSITION} from '../const/currency.const'

export const transformChartGroup = (initialSelectedChartGroup: ICurrency.SelectedChartGroup | null, option: ISelectOption, position: string) => {
    let selectedChartGroup = initialSelectedChartGroup

    switch (position) {
        case SELECT_POSITION.FIRST: {
            if (selectedChartGroup && selectedChartGroup.second && selectedChartGroup.second.value === option.value) {
                selectedChartGroup = {
                    first: option,
                    second: selectedChartGroup.first
                }
            } else {
                selectedChartGroup = {
                    first: option,
                    second: selectedChartGroup ? selectedChartGroup.second : null
                }
            }
            break
        }
        case SELECT_POSITION.SECOND: {
            if (selectedChartGroup && selectedChartGroup.first && selectedChartGroup.first.value === option.value) {
                selectedChartGroup = {
                    first: selectedChartGroup.second,
                    second: option
                }
            } else {
                selectedChartGroup = {
                    first: selectedChartGroup ? selectedChartGroup.first : null,
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