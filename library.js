
var locations = [];

class State{

	constructor(name)
	{
		this.name = name;
		this.description = description;
	}

}

class Item{

	constructor(name)
	{
		this.name = name;
		this.states = [];
		this.description = description;
	}
}

class Location{

	constructor(name)
	{
		this.name = name;
		this.states = [];
		this.items = [];
		this.
	}

	addItem(item)
	{
		this.items.push(item);
	}
}


function addLocation(name)
{
	locations.push(new Location(name));
}

function addItemToLocation(item, location)
{
	locations[findLocation(location)].addItem(item);
}