onPlayerJoin = (p) => {
    playerName = api.getEntityName(p);
    let check_banned = api.getMoonstoneChestItemSlot(p, 0);
    if (check_banned && check_banned.name === "Blue Paintball") {
        api.setPlayerGamemode(p, "spectator");
        api.broadcastMessage(playerName + " died in hardcore and is now spectating");
    }
};

onAttemptKillPlayer = (p) => {
    api.setMoonstoneChestItemSlot(p, 0, "Blue Paintball", 1, {});
    api.setClientOption(p, "respawnButtonText", "Spectate World");
    api.setPlayerGamemode(p, "spectator");
};

onMobKilledPlayer = (atkMob, killed, dmg, item) => {
    killedName = api.getEntityName(killed);
    api.broadcastMessage(killedName + " was killed by a mob with: " + item, { color: "blue" });
};

onPlayerKilledOtherPlayer = (atkPlyr, killed, dmg, item) => {
    attackerName = api.getEntityName(atkPlyr);
    killedName = api.getEntityName(killed);
    api.broadcastMessage(killedName + " was killed by: " + attackerName + " using: " + item);
};
