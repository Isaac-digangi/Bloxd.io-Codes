onPlayerJoin = (playerId, fromGameReset) => {
  playerName = api.getEntityName(playerId);
  owner = "M1DNIGHT_SV"
}

function clearArea(pos1, pos2) {
    let x1 = Math.min(pos1[0], pos2[0]);
    let y1 = Math.min(pos1[1], pos2[1]);
    let z1 = Math.min(pos1[2], pos2[2]);

    let x2 = Math.max(pos1[0], pos2[0]);
    let y2 = Math.max(pos1[1], pos2[1]);
    let z2 = Math.max(pos1[2], pos2[2]);

    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
                api.setBlock(x, y, z, "Air");
            }
        }
    }
}

onBlockStand = (playerId, x, y, z, blockName) => {
const pos1 = [293,3,-502]
const pos2 = [296,9,-518]
  if(blockName == "Obsidian"){
	api.setPosition(playerId, [295.49, 6.00, -499.40])
    clearArea(pos1, pos2);
  }else if(blockName == "Mega Compressed Messy Stone"){
		api.sendMessage(playerId, "completed course")
		api.setPosition(playerId, [295.49, 6.00, -499.40])
		clearArea(pos1, pos2);
	}
}
