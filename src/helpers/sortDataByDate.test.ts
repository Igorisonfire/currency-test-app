import {sortDataByDate} from './sortDataByDate'
import ICurrency from '../models/currency.model'
import {SEGMENT_DATA_TEST_1, SEGMENT_DATA_TEST_2} from '../const/testsMock.const'

describe('sortDataByDate', () => {

    it('should be sorted from earlier to oldest', () => {

        const data: ICurrency.ModelLocal[] = [
            SEGMENT_DATA_TEST_1,
            SEGMENT_DATA_TEST_2
        ]

        const result = sortDataByDate(data)

        const expectedResult = [
            SEGMENT_DATA_TEST_2,
            SEGMENT_DATA_TEST_1
        ]

        expect(result).toStrictEqual(expectedResult)
    })
});




