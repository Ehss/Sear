var windowText = "";
var currentLocation = "";

var locations = [];	
var moves = [];


// Classes

class State{

	constructor(name,description)
	{
		this.name = name;
		this.description = description;
	}

	look()
	{
		return this.description;
	}

}

class Move{

	constructor(startingLocation, startingLocationStates, targetLocation, targetLocationStates, possibleCommands)
	{
		this.startingLocation = startingLocation;
		this.startingLocationStates = startingLocationStates;
		
		this.targetLocation = targetLocation;
		this.targetLocationStates = targetLocationStates;
		
		this.possibleCommands = possibleCommands;
	}


}

class Item{

	constructor(name)
	{
		this.name = name;
		this.states = [];

		this.activeState = 0;
	}


}

class Location{

	constructor(name)
	{
		this.name = name;
		this.states = [];
		this.items = [];

		this.activeState = 0;
	}

	addItem(item)
	{
		this.items.push(item);
	}

	addState(state)
	{
		for (var x = 0; x < this.states.length; x++)
		{
			if (this.states[x].name == state.name)
			{
				this.states[x].description = state.description;
				console.log("State already Exists, replaced description of '" + this.name + " - " + state.name);
				return;
			}
		}
		this.states.push(state);
	}

	look()
	{
		return this.states[this.activeState].look();
	}
}


// Intermediary functions


function messageReceived(message, messages)
{
	for (var x = 0; x < messages.length; x++)
	{
		if (messages[x].trim().toLowerCase() == message.trim().toLowerCase())
		{
			return true;
		}
	}
	return false;
}

function findLocationIndex(location)
{	
	for (var x = 0; x < locations.length; x++)
	{
		if (locations[x].name == location)
		{
			return x;
		}
	}
}


// Add Functions - Used these to build world and interactions

/*
	
	Ready to use:
		
		Making Items
			ex: var spoon = new Item("Spoon"));
		Making Locations:
			ex: addLocation("Kitchen");
		addItemToLocation("Kitchen", spoon);
	
	Experimental: 
		addAction(location, pieces);
	
*/

function addAction(location, pieces)
{
	/*
		pieces will be like -> [typeOfPossibleAction,[actionPieces],requiredState,requiredItem[],possibleTexts[],otherActions[]]
		the amount of pieces are context sensitive, but based on pieces[0], it'll be carried out appropriately
		
		eg. 
		addAction("Garden",["changeRoomState",["HoleDug"],"Normal",["Shovel"],["Dig hole","Use Shovel to dig hole."]]);
		The logic here is that we are in the Garden.
		We want to change the state of the Garden from state "Normal" to state "HoleDug".
		The "Shovel" is required, and no other item is required. 
		Possible commands will be "Dig Hole" and "Use Shovel to dig hole." (this is not an exhaustive list here).
		In all actions, the back end will check the location and see if it matches the player's current location.
		If it does, it'll check the current text and see if it matches one of the possible texts found in the action.
		If it does, it'll check the required state and items (if required). 
		If all checks out, it'll carry out the action. 
		This whole function may get more complicated by the addition of error statements, along the line of 
		No shovel = "You don't have anything to dig with!"
		Wrong state = "You already dug a hole!"
		- Actually, it might be better to have a function "errorStatement" that will be looked at when all else fails
		Other Examples:
		Opening a door:
		addAction("HouseInterior",["changeRoomState",["DoorOpen"],"FrontDoorClosed",[],["Open Door","Open the door."]]);
		
		Using a match to light a candle:
		addAction("Candle",["changeItemState",["LitCandle"],"",["Candle","Match"],[Light Candle","Use Match on Candle"],]);
		
		This is still a concept in progress, and may see other iterations. 
		
	*/
}

function addItem(name)
{

}

function addLocations(names)
{
	for (var x = 0; x < names.length; x++)
	{
		locations.push(new Location(names[x]));
		
	}
}

function addItemToLocation(item, location)
{
	locations[findLocationIndex(location)].addItem(item);
}

function addMove(currentLocation, states, secondaryLocation, states, commands)
{
	moves.push(new Move(currentLocation, states, secondaryLocation, states, commands));
	// moving from one place to another
	//
	// Ex:
	// addMove("HouseInterior", ["DoorOpen"], "Garden", ["Normal"], ["Go outside","Go south"]);
}	

function addStateDescripToLocation(location, state, description)
{
	for (var x = 0; x < locations.length; x++)
	{
		if (locations[x].name == location)
		{
			locations[x].states.push(new State(state, description));	
		}
	}
}

// In Game Functions

function lookAtRoom()
{
	write(getCurrentLocation().look());
	draw();
}

function write(n)
{
	document.getElementById("consoleText").innerHTML += "<p>" + n + "</p>";
}



function getCurrentLocation()
{
	for (var x = 0; x < locations.length; x++)
	{
		if (currentLocation == locations[x].name)
		{
			return locations[x];
		}
	}


}

function getLocation(name)
{
	for (var x = 0; x < locations.length; x++)
	{
		if (name == locations[x].name)
		{
			return locations[x];
		}
	}
}





function tryToMove()
{
	for (var x = 0; x < moves.length; x++)
	{
		console.log(currentLocation);
		console.log(moves[x].startingLocation);
		if (currentLocation == moves[x].startingLocation)
		{ 
			for(var z = 0; z < moves[x].possibleCommands.length; z++)
			{
				if (formated(userInput) == formated(moves[x].possibleCommands[z]))
				{
					for (var y = 0; y < moves[x].startingLocationStates.length; y++)
					{
						if (getState(currentLocation).name == moves[x].startingLocationStates[y])
						{
							for (var a = 0; a < moves[x].targetLocationStates.length; a++)
							{
								if (getState(moves[x].targetLocation).name == moves[x].targetLocationStates[a])
								{
									currentLocation = moves[x].targetLocation;
									return true;
								}
							}
						}
					}
				}
			}
			
		}
	}

	return false;
}

function getState(location)
{	
	var loc = getLocation(location);
	return loc.states[loc.activeState];
}

function interpretText()
{
	if (formated(userInput) == "look")
	{
		write(getCurrentLocation().look());
	}
	else if (tryToMove())
	{
		write(getCurrentLocation().look());		
	}
	else if (isDirectionalMove(userInput))
	{
		write("You cannot move that way.");
	}
	else
	{
		write("Sorry, I don't understand");
	}
}


var moveDirections = ["go west","go east","go south","go north","go up","go down",
"go southeast","go southwest","go northeast","go northwest",
"go south east","go south west","go north east","go north west",
"move west","move east","move south","move north","move up","move down",
"move southeast","move southwest","move northeast","move northwest",
"move south east","move south west","move north east","move north west",
"west","east","south","north","up","down",
"southeast","southwest","northeast","northwest",
"south east","south west","north east","north west",
"w","e","s","n","u","d","se","sw","ne","nw","se","sw","ne","nw",

]
function isDirectionalMove(n)
{	
	for(var x = 0; x < moveDirections.length; x++)
	{
		if (formated(n) == formated(moveDirections[x]))
		{
			return true;
		}
	}
	return false;
}


function formated(n)
{
	return n.trim().toLowerCase();
}

//////////////////////////////////////////////
////////////// Start the Game/////////////////
//////////////////////////////////////////////

var userInput = "";

var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    userInput = document.getElementById("myInput").value;
    write("<span class='userInput'>"+userInput+"</span>");
    userInput = formated(userInput);

    document.getElementById("myInput").value = "";
    interpretText();
  }
});




