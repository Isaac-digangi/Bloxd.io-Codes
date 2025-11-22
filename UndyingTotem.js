//CODE BLOCK_________
let goldBlockToRemove = 1;
let moonstoneToRemove = 2;

let goldBlockCount = 0;
let moonstoneCount = 0;

// First pass: count items
for (let i = 0; i <= 44; i++) {
  let item = api.getItemSlot(myId, i);
  if (!item || !item.name) continue;

  if (item.name === "Block of Gold") {
    goldBlockCount += item.amount;
  } else if (item.name === "Moonstone") {
    moonstoneCount += item.amount;
  }
}

// Check if player has enough of each
if (goldBlockCount >= goldBlockToRemove && moonstoneCount >= moonstoneToRemove) {
  let goldBlockRemoved = 0;
  let moonstoneRemoved = 0;

  // Remove Block of Gold
  for (let i = 0; i <= 44; i++) {
    if (goldBlockRemoved >= goldBlockToRemove) break;
    let item = api.getItemSlot(myId, i);
    if (item && item.name === "Block of Gold") {
      let needed = goldBlockToRemove - goldBlockRemoved;
      if (item.amount > needed) {
        api.setItemSlot(myId, i, item.name, item.amount - needed, item.attributes);
        goldBlockRemoved = goldBlockToRemove;
      } else {
        goldBlockRemoved += item.amount;
        api.setItemSlot(myId, i, "", 0, {});
      }
    }
  }

  // Remove Moonstones
  for (let i = 0; i <= 44; i++) {
    if (moonstoneRemoved >= moonstoneToRemove) break;
    let item = api.getItemSlot(myId, i);
    if (item && item.name === "Moonstone") {
      let needed = moonstoneToRemove - moonstoneRemoved;
      if (item.amount > needed) {
        api.setItemSlot(myId, i, item.name, item.amount - needed, item.attributes);
        moonstoneRemoved = moonstoneToRemove;
      } else {
        moonstoneRemoved += item.amount;
        api.setItemSlot(myId, i, "", 0, {});
      }
    }
  }

  // Give Totem of Undying (as a renamed Gold Coin)
  api.giveItem(myId, "Gold Coin", 1, {
    customDisplayName: "Totem of Undying",
    customDescription: "Revives you once when you take fatal damage"
  });
  api.sendFlyingMiddleMessage(myId, ["Totem of Undying crafted!"], 1000);
} else {
  api.sendMessage(myId, "You need 1 Block of Gold and 2 Moonstones to craft a Totem of Undying.");
}

//WORLD CODE ______ (keeps inventory on forced respawn (killfeed still shows death but broadcasted message says that you revived))

function onPlayerKilledOtherPlayer(mobId, playerId, damage, item) {
const playerName = api.getEntityName(playerId);
    if (hasTotem(playerId)) {

        api.forceRespawn(playerId, api.getPosition(playerId));
        api.setShieldAmount(playerId, 40);
        api.setHealth(playerId, 50);
        api.applyEffect(playerId, "Health Regen", 45000, { inbuiltLevel: 2 });
        api.applyEffect(playerId, "Damage Reduction", 5000, { inbuiltLevel: 2 });
        api.applyEffect(playerId, "Heat Resistance", 40000, { inbuiltLevel: 1 });

        removeTotem(playerId);
        playParticles(playerId);
		api.broadcastMessage(playerName + " Revived with a Totem of Undying");
    }
}

function onMobKilledPlayer(mobId, playerId) {
const playerName = api.getEntityName(playerId);
    if (hasTotem(playerId)) {

        api.forceRespawn(playerId, api.getPosition(playerId));
        api.setShieldAmount(playerId, 40);
        api.setHealth(playerId, 50);
        api.applyEffect(playerId, "Health Regen", 45000, { inbuiltLevel: 2 });
        api.applyEffect(playerId, "Damage Reduction", 5000, { inbuiltLevel: 2 });
        api.applyEffect(playerId, "Heat Resistance", 40000, { inbuiltLevel: 1 });

        removeTotem(playerId);
        playParticles(playerId);
		api.broadcastMessage(playerName + " Revived with a Totem of Undying");

    }
}

// Helper: check if player has a Stick named "Totem of Undying"
function hasTotem(playerId) {
    for (let i = 0; i <= 44; i++) {
        let item = api.getItemSlot(playerId, i);
        if (item && item.name === "Stick" && item.attributes?.customDisplayName === "Totem of Undying") {
            return true;
        }
    }
    return false;
}

// Helper: remove one Totem of Undying
function removeTotem(playerId) {
    for (let i = 0; i <= 44; i++) {
        let item = api.getItemSlot(playerId, i);
        if (item && item.name === "Stick" && item.attributes?.customDisplayName === "Totem of Undying") {
            api.removeItemName(playerId, "Stick", 1) // clear the slot
            break; // remove only one
        }
    }
}

function playParticles(playerId)
{
		let [x, y, z] = api.getPosition(playerId);
api.playParticleEffect({
 		dir1: [-1, -1, -1],
 		dir2: [1, 1, 1],
  		pos1: [x + 2, y + 1.5, z + 2],
    	pos2: [x - 2, y - 1.5, z - 2],
    	texture: "square_particle",
    	minLifeTime: 0.5,
    	maxLifeTime: 2,
    	minEmitPower: 4,
    	maxEmitPower: 6,
    	minSize: 0.1,
   		maxSize: 0.5,
    	manualEmitCount: 200,
    	gravity: [0, -10, 0],
    	colorGradients: [
   	    {
   	        timeFraction: 0,
            minColor: [211, 214, 0, 0.5],
            maxColor: [600, 500, 500, 0.8],
        },
    	],
    	velocityGradients: [
        {
            timeFraction: 1,
            factor: 0.2,
            factor2: 1,
        },
    	],
    	blendMode: 1,
	})
}
