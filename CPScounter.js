/*
    Counts the CPS of each player in the lobby and displays it on the right-info text
    Built upon code by SowrdiWars at https://bloxdium.pages.dev/code?id=68y489e
*/

//whitelist for players that can't be kicked
const banBypass = new Set([
    "M1DNIGHT_SV"
    "l__MIDNIGHT__l"
]);

const playerCPS = {};

function buildGlobalCPSList() {
    const lines = [];

    for (const id of api.getPlayerIds()) {
        const cps = getDisplayedCPS(id);
        const name = api.getEntityName(id) || ("Player " + id);

        lines.push(
            { str: `\n${name}: `, style: { color: "White", fontSize: "14px" } },
            { str: cps, style: { color: "Red", fontSize: "14px", fontWeight: "bold" } }
        );
    }

    return [
        { str: "CPS of All Players", style: { color: "Red", fontSize: "16px", fontWeight: "bold" } },
        ...lines,
        { str: "\n----------------", style: { color: "White", fontSize: "14px" } }
    ];
}

function UpdateAllPlayerGui() {
    const text = buildGlobalCPSList();

    for (const id of api.getPlayerIds()) {
        api.setClientOption(id, "RightInfoText", text);
    }
}


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

        // auto clicker prevention (may kick if drag clicking)
        const name = api.getEntityName(playerId);
        if (!cpsBypass.has(name) && data.lastCPS >= 40) {
            api.kickPlayer(playerId, "You have been kicked for possibly using an auto clicker (drag clicking may also trigger this action)");
            continue;
        }

        UpdateAllPlayerGui();
    }
}



onPlayerDamagingOtherPlayer = (attackingPlayer, damagedPlayer, damageDealt, withItem, bodyPartHit, damagerDbId) => {
    const slotA = api.getMoonstoneChestItemSlot(attackingPlayer, 0);
    const slotD = api.getMoonstoneChestItemSlot(damagedPlayer, 0);
};
