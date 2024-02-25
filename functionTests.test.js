const {checkForWrong} = require('./functionTests')
const {convertToTwoIndexes} = require('./functionTests')

test('Checks that the indexes are being converted properly', () => {

    expect(convertToTwoIndexes(1,1)).toBe(`1,0`)

})

test('Testing to see if "checkForWrong" returns "false" correctly', () => {

    expect(checkForWrong([1,2,3,4],[1,3,2,4])).toBe(false)
})