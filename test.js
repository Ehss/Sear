addLocations(
  ["MyBedroom","Hallway","Bathroom","GuestBedroom",
   "MasterBedroom","Stairs","MasterBedroomBed","MasterBedroomBath"
  ]);

//addStateDescripToLocation(location, state, description)

addStateDescripToLocation("MyBedroom", "Normal", "You're standing in your bedroom. There's a bed, freshly made. A door west leads out from the room.");
addStateDescripToLocation("Hallway", "Normal", "You're standing in the hallway. This connects everything - your bedroom to the east, a bathroom to the south-east, a guest bedroom to the south, the stairs to the north, and your parents' bedroom to the north west.");
addStateDescripToLocation("Bathroom", "Normal", "You're standing in the bathroom. There's a sink, a shower, and a toilet. Not much else. The only way out is the hallway to the north west.");
addStateDescripToLocation("GuestBedroom", "Normal", "You're standing in the guest bedroom. It smells musty from months of disuse. The only way out is the hallway to the north.");
addStateDescripToLocation("Stairs", "Normal", "You're standing at the top of the stairs. The stairs run down, and the hallway is to the south.");
addStateDescripToLocation("MasterBedroomBed", "Normal", "You're standing in the master bedroom. The master bath is to the west, and the hallway is to the south east.");
addStateDescripToLocation("MasterBedroomBath", "Normal", "You're standing in the master bathroom. There're two sinks, a shower, and a toilet. The master bedroom is to the east.");

addMove("MyBedroom", ["Normal"], "Hallway", ["Normal"], ["Go West","West","W"]);
addMove("Hallway", ["Normal"], "MyBedroom", ["Normal"], ["Go East","East","E"]);

addMove("Hallway", ["Normal"], "Bathroom", ["Normal"], ["Go Southeast","Southeast","se"]);
addMove("Bathroom", ["Normal"], "Hallway", ["Normal"], ["Go Northwest","Northwest","nw"]);

addMove("Hallway", ["Normal"], "GuestBedroom", ["Normal"], ["Go South","South","s","Move South"]);
addMove("GuestBedroom", ["Normal"], "Hallway", ["Normal"], ["Go North","North","n","Move North"]);

currentLocation = "MyBedroom";

addPicture("MyBedroom","dragonballs.png");
addPicture("Hallway","dragonballs2.png");
addPicture("GuestBedroom","dragonball.png");

var apple = new Item("Apple");
apple.addState(new State("Normal","The apple is shiny and red. Looks good enough to eat!"));


addItemToLocation(apple, "MyBedroom");\


addPossibleAction(
	[
		["itemInArea","Apple"],
		["currentLocation","MyBedroom"],
		["locationState","MyBedroom",["Normal"]],
	],
	[
		["changeLocationState","MyBedroom","Turned"]
	
	],

	["turn apple"],
	"You turned the apple."

);
