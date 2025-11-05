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
