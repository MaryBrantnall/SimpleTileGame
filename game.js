/* 
AUTHOR: Mary Brantnall
DATE: November 30th, 2023
More information in README.
*/

async function game() {

    //This is importing the data we need for our puzzle from an api :)
    const response = await fetch("https://prog2700.onrender.com/threeinarow/random");
    const blockGame = await response.json();

    //This statement was added to generate a random tile data set that only have 6 rows
    if (blockGame.rows.length == 6 ) {

        //This creates our gameboard using HTML table tags
        let newHTML = `<table id = "gameBoard"></table>`;
        document.querySelector('#theGame').innerHTML += newHTML;

        for (let i = 0; i < blockGame.rows.length; i++) {

            let tableRows = `<tr>`

            for (let j = 0; j < blockGame.rows[i].length; j++) {

                tableRows += `<td><button id = '${i},${j}' ></button></td>`

                
            }

            tableRows += `</tr>`
            document.querySelector('#gameBoard').innerHTML += tableRows

        }
        

        //Variables for the three state colors
        let state0Color = 'darkseagreen'
        let state1Color = 'cadetblue'
        let state2Color = 'lightyellow'

        //Check puzzle button that will trigger an alert message about whether something is wrong or not
        document.querySelector('#theGame').innerHTML += `<button id = "CheckPuzzle">Check Puzzle</button>`
        let checkPuzzleButton = document.querySelector('#CheckPuzzle');

        checkPuzzleButton.addEventListener('click', function() {

            if (correctArray.toString() == currentArray.toString()) {

                alert(`you win!`)

            } else if (checkForWrong() == true) {

                alert(`You're on the right track!`)

            } else if (checkForWrong() == false) {

                alert(`Something is wrong`)

            } else {

                console.log(`this shouldnt happen`)
            }

            
        })

        //This button will reveal the board with all of the correct answers (more code regarding this below)
        let answerButton = document.createElement("button");
        answerButton.setAttribute("id", "GiveAnswer");
        document.querySelector('#theGame').appendChild(answerButton);

        //1d arrays for pushing state values into
        let currentArray = [];
        let correctArray = []; 

        for(let i = 0; i < blockGame.rows.length; i++) {

            for (let j = 0; j < blockGame.rows[i].length; j++) {

            

                var current = blockGame.rows[i][j].currentState;
                var correct = blockGame.rows[i][j].correctState; 

                currentArray.push(current)
                correctArray.push(correct)

                //this is mapping our default game board (on reload)
                

                if (current == 0) {

                    document.getElementById(`${i},${j}`).style.backgroundColor = state0Color;
            
                } else if (current == 1) {
            
                    document.getElementById(`${i},${j}`).style.backgroundColor = state1Color;
            
                } else {
            
                    document.getElementById(`${i},${j}`).style.backgroundColor = state2Color;
                }
                
                //This converts the 1d arrays correctArray and currentArray back to 2d
                function convertToTwoIndexes (index, apiIndexi) {

                    let iIndex = index % apiIndexi ;
                    let jIndex = (index - iIndex) / apiIndexi
                    

                    let indexes = `${jIndex},${iIndex}`

                    return indexes;


                }
                
                //This is function that will adjust our "tiles" when clicked and change the "current" value to the corresponding value in our api
                function colorChange(tile) {
                    
                    let buttonColor = document.getElementById(tile).style.backgroundColor; 
                    
                    var apiIndexi = parseInt(tile[0])
                    var apiIndexj = parseInt(tile[2])

            
                    if (buttonColor == state0Color) {
            
                    document.getElementById(tile).style.backgroundColor = state1Color
                    //This changes the value in our currentArry to match up with the new state value
                    //The equation used turns our "i" and "j" corrdinates into index values in our current array or correctArray
                    currentArray[(apiIndexi+apiIndexj)+(5*apiIndexi)] = 1;
                
                        // (i+j)+(5*i) = Index in currentArray and correctArray
                        
                    } else if (buttonColor == state1Color) {
            
                    document.getElementById(tile).style.backgroundColor = state2Color;;
                    //This changes the value in our currentArry to match up with the new state value
                    //The equation used turns our "i" and "j" corrdinates into index values in our current array or correctArray
                    currentArray[(apiIndexi+apiIndexj)+(5*apiIndexi)] = 2;
            
            
                    } else {
            
                    document.getElementById(tile).style.backgroundColor = state0Color
                    //This changes the value in our currentArry to match up with the new state value
                    //The equation used turns our "i" and "j" corrdinates into index values in our current array or correctArray
                    currentArray[(apiIndexi+apiIndexj)+(5*apiIndexi)] = 0;
                    
                    }

                    console.log(currentArray)

                
                }

        
                    
            }
        }
        
    


        //This will activate the "colorChange" function to change our tiles whien clicked
        let allButtons = document.querySelectorAll('button');
        allButtons.forEach(function(button) {

            if (button.id != "CheckPuzzle" && button.id != "GiveAnswer") {

                let id = button.id;
                let firstIndex = id.charAt(0)
                let lastIndex = id.charAt(2)
        
                if (blockGame.rows[firstIndex][lastIndex].canToggle == true){
        
                    button.addEventListener('click', function(event) {
                        colorChange(event.target.id);

                        checkbox.checked = false;
                
                    })
                }
            }

            
        })

    //This checks to see if any of the tiles are incorrect
        function checkForWrong() {

            let isNoError = true;
            for(let i = 0; i < currentArray.length; i++) {

                if(currentArray[i] != 0 && currentArray[i] != correctArray[i]) {

                    isNoError = false;
                    break;

                }
            }

            return isNoError;
        }

        //This checkbox can be checked to highlight the wrong tiles in pink
        let checkboxDiv = document.createElement("div");
        checkboxDiv.setAttribute("class", "checkboxDiv");
        document.querySelector('#theGame').appendChild(checkboxDiv)

        let checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "checkbox");
        document.querySelector('.checkboxDiv').innerHTML = "<label for='checkbox'>Checkbox to highlight wrong tiles</label>"
        
        document.querySelector('.checkboxDiv').appendChild(checkbox);

        checkbox.addEventListener('change', function () {
        
        if (checkbox.checked) {
            highlightWrongTiles();

        } else {

            reset()

        }

        });

    
        //this function is what runs when the above checkbox is checked
        function highlightWrongTiles() {

        for (let i = 0; i < currentArray.length; i++) {

            if (currentArray[i] != 0 && currentArray[i] !== correctArray[i]) {

            let buttonId = convertToTwoIndexes(i, blockGame.rows.length);  

            let wrongButton = document.getElementById(buttonId);
    
            wrongButton.style.backgroundColor = 'coral';
            }
        }
        }

        //This will reset our board back to what it was when the checkbox is unchecked
        function reset () {

            for (let i = 0; i < currentArray.length; i++) {

                let buttonId = convertToTwoIndexes(i, blockGame.rows.length);
                
                let buttonColor = document.getElementById(buttonId)

                if (currentArray[i] == 0) {

                    buttonColor.style.backgroundColor  = state0Color
            
                } else if (currentArray[i] == 1) {
            
                    buttonColor.style.backgroundColor  = state1Color
            
                } else {
            
                    buttonColor.style.backgroundColor  = state2Color;
                }

            }

        }

        //This is the function that runs to show the correct board if the answer button is pressed
        function revealCorrect () {

            
            for (let i = 0; i < correctArray.length; i++) {

                let buttonId = convertToTwoIndexes(i, blockGame.rows.length);
                let buttonColor = document.getElementById(buttonId)

                if (correctArray[i] == 0) {

                    buttonColor.style.backgroundColor  = state0Color
            
                } else if (correctArray[i] == 1) {
            
                    buttonColor.style.backgroundColor  = state1Color
            
                } else {
            
                    buttonColor.style.backgroundColor  = state2Color;
                }

            }

            setTimeout(reset, 5000)
            
        }


        //This is the give answer button that makes sure you actually want the answer using a confirm box
        document.querySelector('#GiveAnswer').innerHTML = `Answer`
        let giveAnswerButton = document.querySelector('#GiveAnswer');
        giveAnswerButton.addEventListener('click', function() {

            if(confirm(`Are you sure you want the answer?`)) {
                
                revealCorrect();
                

            } else {

                console.log(`nothing happened`)
            
            }
            
            
        })
    
    } else {

        //reloads the window if blockGame rows are not equal to 6.
        window.location.reload()

    }

} 

game();

