
var windowText = "";
var currentLocation = "";

var locations = [];


// Classes

class State{

	constructor(name)
	{
		this.name = name;
		this.description = description;
	}

	look()
	{
		return this.description;
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

function addLocation(names)
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

function addMove(currentLocation, state, secondaryLocation, text)
{
	// moving from one place to another
	//
	// Ex:
	// addMove("HouseInterior", ["DoorOpen"], "Garden", ["Go outside","Go south"]);
}	


// In Game Functions

function lookAtRoom()
{
	windowText = getCurrentLocation().look();
	draw();
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

}


