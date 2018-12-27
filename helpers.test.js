const helpers = require('./helpers');

test('', () => {

        var dates = [
                new Date('2018-10-02T22:45:35Z'),
                new Date('2018-09-27T12:27:32Z'),
                new Date('2018-09-29T00:29:19Z'),
                new Date('2018-10-01T16:57:16Z'),
                new Date('2018-09-26T14:56:30Z'),
                new Date('2018-10-03T01:38:38Z')
        ];

        var expected = dates[4];
        var earliestRet = helpers.getEarliestDate(dates);
        expect(earliestRet).toBe(expected);

});

