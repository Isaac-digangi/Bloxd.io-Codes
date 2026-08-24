playerName = api.getEntityName(playerId)

onPlayerJoin = (p) => {
    api.setMoonstoneChestItemSlot(p, 0, "Black Paintball", 1, { customDisplayName: "DO NOT REMOVE", customDescription: "Essential for registering as alive." });
    let check_banned = api.getMoonstoneChestItemSlot(p, 1)
    if(check_banned && check_banned.name === "Blue Paintball"){
        api.kickPlayer(p, "Death-banned from lobby");
        api.broadcastMessage(playerName + " is death-banned from the lobby and cannot rejoin")
    }
};

onAttemptKillPlayer = (p) => {
    api.setMoonstoneChestItemSlot(p, 0, "Black Paintball", 1, {});
    api.setMoonstoneChestItemSlot(p, 1, "Blue Paintball", 1, {});
    api.kickPlayer(p, "You died in hardcore");
};

onInventoryUpdated = (p) => {
    let find_paintball = api.findItem(p, "Black Paintball");
    if(find_paintball){
        api.removeItemName(p, "Black Paintball", 1)
        api.kickPlayer(p, "Do not remove the player stats from MS chest")
    }
}

onMobKilledPlayer = (atkMob, killed, dmg, item) => {
    killedName = api.getEntityName(killed)
    api.broadcastMessage(killedName + " was killed by a mob with: " + item, {color: "blue"})
}

onPlayerKilledOtherPlayer = (atkPlyr, killed, dmg, item) => {
    attackerName = api.getEntityName(atkPlyr)
    killedName = api.getEntityName(killed)
    api.broadcastMessage(killedName + " was killed by: " + attackerName + " using: " + item)
}
/*
playerName = api.getEntityName(playerId)

onPlayerJoin = (p) => {
    let check_banned = api.getMoonstoneChestItemSlot(p, 0)
    if(check_banned && check_banned.name === "Blue Paintball"){
        api.setGamemode(p, "Spectator")
        api.broadcastMessage(playerName + " died in hardcore and cannot respawn")
    }
};

onAttemptKillPlayer = (p) => {
    api.setMoonstoneChestItemSlot(p, 0, "Blue Paintball", 1, {});
    api.setClientOption(p, "general:respawn", false);
    api.setClientOption(p, "general:spectate", true);
    api.setGamemode(p, "Spectator");
};

onMobKilledPlayer = (atkMob, killed, dmg, item) => {
    killedName = api.getEntityName(killed)
    api.broadcastMessage(killedName + " was killed by a mob with: " + item, {color: "blue"})
}

onPlayerKilledOtherPlayer = (atkPlyr, killed, dmg, item) => {
    attackerName = api.getEntityName(atkPlyr)
    killedName = api.getEntityName(killed)
    api.broadcastMessage(killedName + " was killed by: " + attackerName + " using: " + item)
}
*/
