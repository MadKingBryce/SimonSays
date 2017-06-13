$(document).ready(function(){

messagesAway()
//: Variables

	//- Simon
	var letters = ["A", "S", "D", "F"] //An array that holds all possible buttons
	var simonStack = ["A", "S", "D", "F"] //An array that holds whatever simon says in order
	var simonCount = 0 //A variable to determine how many more elements simon has left to say

	//- Auxiliary things
	var lastUsed = "" //A variable for storing the last tile that was lit (used to turn it off later)
	var userInputEnabled = false //A boolean that determines wherther the user's keystrokes are registered by simon. 
	var continueMode = false //A boolean that determines whether or not the round is over and the user is ready to start the next round
	var simonStepCount = 0 //A variable for determining the which of Simon's steps that the user is on. This is used when the user is inputing to the tiles
	//- Auxiliary things




//: Simon Functions

	function addToStack() { //A function for adding on elements to simon's directions
		var random = Math.floor(Math.random() * 4) //Generates a random number between 0 and 3 (4 numbers), each representing the letters in Letters
		simonStack.push(letters[random]) //This adds to the simonStack array member of letters corresponding to the randomly generated number
	}

	function simonSays() {
		lightUp(simonStack[simonCount])//highlights the tile that corresponds to the simonStack.
		if (++simonCount < simonStack.length ) { //Checks if there are anymore elemenents to be screened
			setTimeout(simonSays, 300); //setTimeout activates a function every 300 miliseconds. The function will call itself and start the process over again
		} else { //if there are no more elements
			simonDone() //calls the function that handles the finished 
		}
	}



//: Handle Changes to DOM
	function lightUp(theTile) { //This method is designed make a tile light up. 
		clear() //calls the clear function while passing in the last used tile
		if(theTile === "A" | theTile === "S" | theTile === "D" | theTile === "F") { //Checks if the input is an A S D or F
			var color = $("#" + theTile).css("border-color") // stores the color of the current tile's border 
			$("#" + theTile).css("background-color", color) //sets the background to match the the border (basically highlighting it)
			// $( "#" + theTile ).highlight();
			lastUsed = theTile; //sets the last used tile as the tile that was used last
		} else {
			invalidInput() //activates the invalidInput function
		}
	}

	function clear() {
		if (lastUsed!== "") { //Checks if lastUsed is a blank string or not (this is necessary for the first iteration and)
			$("#" + lastUsed).css("background-color", "white") //Sets the background of the 
		}
	}




//: Handle user input

	$("#theButton").click(function(){ //links to the button in html 
		$("#theButton").hide()
		begin(); //calls the begin function
	});

	$( document).keypress(function() { //This function executes whenever there is a detected keystroke
			if (userInputEnabled) { //Checks if the userInputEnabled variable is true
				var theLetter = "" //creates a variable named theLetter and sets it equal to an empty string. This variable is used hold the letter 
	 		
	 			if(event.which === 97) { //checks if the keychecked is equal to key-code 97 aka a lowercase "a"
	 				theLetter="A"	//sets theLetter = to A
	 			} else if(event.which === 115) {
	 				theLetter="S"
	 			} else if(event.which === 100) {
	 				theLetter="D"
	 			} else if(event.which === 102) {
	 				theLetter="F"
	 			}
	 			checkForCorrectness(theLetter) //runs the function checkForCorrectness and passes in the letter that was chosen.
	 		
	 		} else if (continueMode){ //if user input is not enabled, this checks if the variable continueMode is true. This block will execute if there is a key pressed and the user is not in input mode.
	 			clear(lastUsed); //clears the highlight of the last highlighted tile
	 			continueModeToggle(); //sets continue mode to false
	 			messagesAway() //calls function that gets rid of the messages on the screen
	 			begin() //calls the starting function that adds another element to simonStack and starts all over again

	 			
	 		}
		});

	function checkForCorrectness(theLetter) { //This function is for determining what to do after a tile has been selected
		lightUp(theLetter) //calls the lightUp function to light up the tile
		if (lastUsed === simonStack[simonStepCount]) { //checks if the lastUsed title (the one just selected) matches up with the letter in the simonStack
			simonStepCount++ //moves foreward in the simon steps
			if(simonStepCount === simonStack.length) { // checks if the user is at the end of the steps
				userDone() //runs userDone function to handle what to do next
			}
		} else { //if the user selects a tile that was not next in the steps
			wrongChoice() //Calls the function that handles wrong choices. 
		}
		
	}



//: GameFlow handling]
	function messagesAway() {
		$("#good-job-message").hide() //hides good job message
		$("#continue-message").hide() //hides continue message

	}

	function begin() {
		addToStack() //Calls addToStack function
		simonSays()	//Begins the process for the game
	}

	function simonDone() { //A function for handling what happens after simon is done saying things
			userInputToggle() //turn user input on
			setTimeout(clear, 300) //clear the last tile after 300 miliseconds
	}

	function userDone() {
		$("#continue-message").show() //shows the hidden div with a continue message
		$("#good-job-message").show() //shows the hidden div with the good job message
		continueModeToggle() //toggles continue mode on
		simonStepCount = 0 //sets simonStepCount variable to 0 (So as to prepare for the next round)
		simonCount = 0
		userInputToggle() //toggles userInput mode off

	}

	function userInputToggle() { //function to turn the user input capabilities on and off
		userInputEnabled = !userInputEnabled //Turns the variable to the oposite of what it currently is (on -> off and off -> on) 
	}
	function continueModeToggle() { //function for toggling continue mode on and off
		continueMode = !continueMode  //sets continueMode to the opposite of whatever continueMode is
	}

	function invalidInput() {
		alert("Choose A, S, D, or F") //This alert tells the user to input one of those four leters.
	}

	function wrongChoice() { //This function handles what happens when the user picks the wrong tile
		alert("SHAAAME!@+E)JWOLFKDJFL: BLAAAARG Wrong Choice")
		userInputToggle() //Toggles user input choice
		reset() //Calls the reset function in order to set the stage for another game
		clear() //Clears all highlighted tiles
	}

	function reset() { // This function is for reseting the game after the user gets a simon step wrong
		simonStepCount = 0 // Sets stepCount to 0 so as to reset the game. 
		simonCount = 0 // 
		simonStack = [] //This removes all of the elements fromt he simonStack and p
		$("#theButton").show() // the start button is unhidden
	}








	

});
