const playerCPS = {};

onPlayerClick = (playerId) => {
    const now = Date.now();
    if (!playerCPS[playerId]) {
        playerCPS[playerId] = { clicks: [], lastClick: now, lastCPS: 0, lastDecayTime: 0 };
    }
    playerCPS[playerId].clicks = playerCPS[playerId].clicks.filter(ts => now - ts < 1000);
    playerCPS[playerId].clicks.push(now);
    playerCPS[playerId].lastClick = now;
    playerCPS[playerId].lastDecayTime = now;
    playerCPS[playerId].lastCPS = playerCPS[playerId].clicks.length;

    UpdatePlayerGui(playerId);
};

function getDisplayedCPS(playerId) {
    const now = Date.now();
    const data = playerCPS[playerId];
    if (!data) return "0";

    data.clicks = data.clicks.filter(ts => now - ts < 1000);
    const realCPS = data.clicks.length;

    return String(realCPS);
}

function UpdatePlayerGui(playerId) {
    const slot0 = api.getMoonstoneChestItemSlot(playerId, 0);
    if (!slot0 || !slot0.attributes || !slot0.attributes.customAttributes) 
{
return;
}

    const cps = getDisplayedCPS(playerId);
    const data = slot0.attributes.customAttributes;
    const killstreak = data.killstreak || 0;

    api.setClientOption(playerId, "RightInfoText", [
        { str: "Your PvP Stats", style: { color: "Red", fontSize: "14px", fontWeight: "bold" } },
        { str: "\nCPS: ", style: { color: "White", fontSize: "14px" } },
        { str: cps, style: { color: "Red", fontSize: "14px", fontWeight: "bold" } },
        { str: "\nCombo: ", style: { color: "White", fontSize: "14px" } },
        { str: "", style: { color: "Red", fontSize: "14px", fontWeight: "bold" } },
        { str: "\n------------", style: { color: "White", fontSize: "14px" } }
        
    ]);
}


function onPlayerJoin(playerId) {
    const slot0 = api.getMoonstoneChestItemSlot(playerId, 0);
    UpdatePlayerGui(playerId);
    if (!slot0 || !slot0.attributes || !slot0.attributes.customAttributes) {
        api.setMoonstoneChestItemSlot(playerId, 0, "Dirt", 1, {
            customAttributes: {
                Losses: 0,
                wins: 0,
                killstreak: 0,
                kills: 0,
                games: 0,
                highestKillstreak: 0,
                                combo: 0,
            },
        });
    }
    const slot1 = api.getMoonstoneChestItemSlot(playerId, 1);
    if (!slot1 || !slot1.attributes || !slot1.attributes.customAttributes) {
        api.setMoonstoneChestItemSlot(playerId, 1, "Moonstone Chest", 1, {
            customAttributes: {
                moonstoneChest: [],
            },
        });
    }
}

function tick() {
    const now = Date.now();

    for (const playerId of api.getPlayerIds()) {
        const data = playerCPS[playerId];
        if (!data) continue;

        const timeSinceLastClick = now - data.lastClick;

        if (timeSinceLastClick >= 2000) {
            if (now - data.lastDecayTime >= 1000) {
                data.lastCPS = Math.max(0, data.lastCPS - 1);
                data.lastDecayTime = now;
            }
        } else {
            data.clicks = data.clicks.filter(ts => now - ts < 1000);
            data.lastCPS = data.clicks.length;
        }

        UpdatePlayerGui(playerId);
    }
}

onPlayerDamagingOtherPlayer = (attackingPlayer, damagedPlayer, damageDealt, withItem, bodyPartHit, damagerDbId) => {
    const slotA = api.getMoonstoneChestItemSlot(attackingPlayer, 0);
    const slotD = api.getMoonstoneChestItemSlot(damagedPlayer, 0);
};
