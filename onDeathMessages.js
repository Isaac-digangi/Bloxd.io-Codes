function onPlayerKilledOtherPlayer(attackingPlayer, killedPlayer, damageDealt, withItem) {
	const attackerName = api.getEntityName(attackingPlayer);
	const killedName = api.getEntityName(killedPlayer);

if (withItem === "FallDamage") {
  	api.broadcastMessage(killedName + " fell from a high place", {color: "Red"});
} else if (withItem === "Lava") {
  	api.broadcastMessage(killedName + " tried to swim in lava", {color: "Red"});
} else if (withItem === "Stomp Damage Enchantment"){
	api.broadcastMessage(killedName + " was crushed by " + attackerName + " with " + "Spiked Boots", {color:"Red"});
}else if (withItem === "Firecracker"){
	api.broadcastMessage(killedName + " went off with a bang", {color: "Red"});
}else if (withItem === "Firecracker Pebble"){
	api.broadcastMessage(killedName + " went off with a bang", {color: "Red"});
}else if (withItem === "Instant Damage Potion"){
	api.broadcastMessage(killedName + " was killed by magic", {color: "Red"});
}else if (withItem === "Moonstone Explosive"){
	api.broadcastMessage(killedName + " blew up", {color: "Red"});
}else if (withItem === "Moonstone Remote Explosive"){
	api.broadcastMessage(killedName + " blew up", {color: "Red"});
}else if (withItem === "Fireball Block"){
	if(killedName === attackerName){
		api.broadcastMessage(killedName + " went up in flames", {color: "Red"});
	}else{
		api.broadcastMessage(killedName + " was fireballed by " + attackerName, {												color:"Red"});
}
}else if (withItem === "Iceball Block"){
	if(killedName === attackerName){
		api.broadcastMessage(killedName + " froze to death", {color: "Red"});
	}else{
		api.broadcastMessage(killedName + " was frozen by " + attackerName, {												color:"Red"});
}
}else if (withItem === "Spikes"){
	if(killedName === attackerName){
		api.broadcastMessage(killedName + " was impaled on spikes", {color: "Red"});
	}else{
	api.broadcastMessage(killedName + " was impaled on spikes by " + attackerName, {color: "Red"});
}
}else {
  api.broadcastMessage(killedName + " was slain by " + attackerName + " with " + withItem, {color: "Red"});
}
}


/* code for screen tint on death
const lobbySpawn = [-3.5, 91.0, -2.5];
const tintTimers = {}; // playerId → tick count

function onPlayerKilledOtherPlayer(attackingPlayer, killedPlayer, damageDealt, withItem) {
	const killedName = api.getEntityName(killedPlayer);
	api.setClientOptions(killedPlayer, {autoRespawn: true});
	api.setClientOptions(killedPlayer, {cameraTint: [1, 0, 0, 0.3]});
	tintTimers[killedPlayer] = 0; // ✅ Track tint for all deaths

	if (withItem === "FallDamage") {
		api.sendFlyingMiddleMessage(killedPlayer, [{str: killedName + " fell from a high place", style: {color: "red"}}], 100);
	} else if (withItem === "Lava") {
		api.sendFlyingMiddleMessage(killedPlayer, [{str: killedName + " died in lava", style: {color: "red"}}], 100);
	}
}

function onRespawnRequest(playerId) {
	api.setClientOptions(playerId, {cameraTint: [0, 0, 0, 0]});
	delete tintTimers[playerId]; // Stop tracking once they respawn
	return lobbySpawn;
}

function tick() {
	for (const playerId in tintTimers) {
		tintTimers[playerId]++;

		if (tintTimers[playerId] === 60) {
			api.setClientOptions(playerId, {cameraTint: [0, 0, 0, 0]});
			delete tintTimers[playerId];
		}
	}
}
*/
/* adjustable messages
const lobbySpawn = [-3.5, 91.0, -2.5];
const tintTimers = {}; // playerId → tick count

function onPlayerKilledOtherPlayer(attackingPlayer, killedPlayer, damageDealt, withItem) {
	const killedName = api.getEntityName(killedPlayer);
	api.setClientOptions(killedPlayer, {autoRespawn: true});
	api.setClientOptions(killedPlayer, {cameraTint: [1, 0, 0, 0.3]});
	tintTimers[killedPlayer] = 0;

	let message = `${killedName} died`;
	switch (withItem) {
		case "FallDamage":
			message = `${killedName} fell from a high place`;
			break;
		case "Lava":
			message = `${killedName} died in lava`;
			break;
		case "Fireball Block":
			message = `${killedName} went up in flames`;
			break;
		case "Moonstone Explosive":
			message = `${killedName} blew up`;
			break;
		case "Iceball Block":
			message = `${killedName} froze to death`;
			break;
		// Add more cases as needed
	}

	api.sendFlyingMiddleMessage(killedPlayer, [{str: message, style: {color: "red"}}], 1000);
}

function onRespawnRequest(playerId) {
	api.setClientOptions(playerId, {cameraTint: [0, 0, 0, 0]});
	delete tintTimers[playerId]; // Stop tracking once they respawn
	return lobbySpawn;
}

function tick() {
	for (const playerId in tintTimers) {
		tintTimers[playerId]++;

		if (tintTimers[playerId] === 60) {
			api.setClientOptions(playerId, {cameraTint: [0, 0, 0, 0]});
			delete tintTimers[playerId];
		}
	}
}
*/
