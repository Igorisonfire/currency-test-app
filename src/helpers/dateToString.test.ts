import {dateToChartText, dateToString} from './dateToString'

describe('Date to string helpers', () => {

    it('date to YYY-MM-DD format string"', () => {

        const result = dateToString(new Date('2021-02-20'))

        expect(result).toBe('2021-02-20')
    })

    it('date null to string', () => {

        const result = dateToString(null)

        expect(result).toBe('')
    })

    it('date to `MMM DD` format string"', () => {

        const result = dateToChartText('2021-02-20')

        expect(result).toBe('Feb 20')
    })
});




