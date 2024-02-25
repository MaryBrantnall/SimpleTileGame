//Function tests.

function checkForWrong(currentArray, correctArray) {

    let isNoError = true;
    for(let i = 0; i < currentArray.length; i++) {

        if(currentArray[i] != 0 && currentArray[i] != correctArray[i]) {

            isNoError = false;
            break;

        }
    }

    return isNoError;
}

function convertToTwoIndexes (index, apiIndexi) {

    let iIndex = index % apiIndexi ;
    let jIndex = (index - iIndex) / apiIndexi
    

    let indexes = `${jIndex},${iIndex}`

    return indexes;


}

module.exports = {
    checkForWrong,
    convertToTwoIndexes
}