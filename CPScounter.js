/*
    Counts the CPS of each player in the lobby and displays it on the right-info text
    Built upon code by SowrdiWars at https://bloxdium.pages.dev/code?id=68y489e
    Rest of world code by M1DNIGHT_SV
*/

//whitelist for players that can't be kicked
const banBypass = new Set([
    "M1DNIGHT_SV", "x_voidscythe"
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
    return String(data.clicks.length);
}

function UpdatePlayerGui(playerId) {
    const slot0 = api.getMoonstoneChestItemSlot(playerId, 0);
    if (!slot0 || !slot0.attributes || !slot0.attributes.customAttributes) {
        return;
    }

    const cps = getDisplayedCPS(playerId);
    const data = slot0.attributes.customAttributes;
    const killstreak = data.killstreak || 0;
}

function onPlayerJoin(myId) {
    api.clearInventory(myId);
    api.setPosition(myId, [0, 1, 0]);

    const playerName = api.getEntityName(myId);

    api.setTargetedPlayerSettingForEveryone(myId, "nameTagInfo", {
        content: [{ str: playerName, style: { color: "white" } }],
        subtitle: [{ str: "Player", style: { color: "white" } }],
        backgroundColor: "black",
    }, true);

    if (playerName === "M1DNIGHT_SV") {
        api.setTargetedPlayerSettingForEveryone(myId, "nameTagInfo", {
            content: [{ str: playerName, style: { color: "#5c00a4" } }],
            subtitle: [{ str: "Lobby Owner", style: { color: "cyan" } }],
            backgroundColor: "black",
        }, true);

		api.updateEntityNodeMeshAttachment(myId, "HeadMesh", "BloxdBlock",
		{blockName:"Moonstone Explosive",size:.6,
		meshOffset:[0,0,0]},[0,0.3,0],[0,0,0])
		api.scalePlayerMeshNodes(myId, {
		"TorsoNode": [1,1,1], 
		"HeadMesh": [1,1,1],
		"ArmRightMesh": [1,1,1], 
		"ArmLeftMesh": [1,1,1], 
		"LegLeftMesh": [1,1,1],
		"LegRightMesh": [1,1,1],
		});
    }

	if (playerName === "x_voidscythe") {
        api.setTargetedPlayerSettingForEveryone(myId, "nameTagInfo", {
            content: [{ str: playerName, style: { color: "#5c00a4" } }],
            subtitle: [{ str: "Lobby Mod", style: { color: "cyan" } }],
            backgroundColor: "black",
        }, true);
    }

    api.sendTopRightHelper(myId, "crown", "Welcome " + playerName, {
        duration: 5, height: 150, width: 350, color: "#340034",
        iconSizeMult: 3, textAndIconColor: "#FFFFFF", fontSize: "22px"
    });

    api.sendTopRightHelper(myId, "exclamation", "Type 'pots' in chat to refil potions", {
        duration: 5, height: 150, width: 350, color: "#340034",
        iconSizeMult: 3, textAndIconColor: "#FFFFFF", fontSize: "22px"
    });

    const slot0 = api.getMoonstoneChestItemSlot(myId, 0);
    UpdatePlayerGui(myId);

    if (!slot0 || !slot0.attributes || !slot0.attributes.customAttributes) {
        api.setMoonstoneChestItemSlot(myId, 0, "Dirt", 1, {
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

    const slot1 = api.getMoonstoneChestItemSlot(myId, 1);
    if (!slot1 || !slot1.attributes || !slot1.attributes.customAttributes) {
        api.setMoonstoneChestItemSlot(myId, 1, "Moonstone Chest", 1, {
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

        const name = api.getEntityName(playerId);

        if (!banBypass.has(name) && data.lastCPS >= 40) {
            api.kickPlayer(playerId, "You have been kicked for possibly using an auto clicker (drag clicking may also trigger this action)");
            continue;
        }
    }

    UpdateAllPlayerGui();
}

onPlayerDamagingOtherPlayer = (attackingPlayer, damagedPlayer, damageDealt, withItem, bodyPartHit, damagerDbId) => {
    const slotA = api.getMoonstoneChestItemSlot(attackingPlayer, 0);
    const slotD = api.getMoonstoneChestItemSlot(damagedPlayer, 0);
};

onPlayerChat = (playerId, chatMessage, channelName) => {
isOwner = api.getEntityName(playerId)
	if(isOwner === "M1DNIGHT_SV"){
    api.broadcastMessage([
        {str:"[", style:{color:"#CEF3FF"}},
        {icon:"zap", style:{color:"#FE0000"}},
        {str:" Lobby", style:{color:"white"}},
        {str:"Owner", style:{color:"#FE0000"}},
        {str:"] ", style:{color:"#CEF3FF"}},
        {str: isOwner, style:{color:"blue"}},
        {str:": " + chatMessage, style:{color:"white"}}
		]);
	return false;
	}


    if (chatMessage.toLowerCase() == "pots") {

        api.setItemSlot(playerId, 46, "Diamond Helmet", null);
        api.setItemSlot(playerId, 47, "Diamond Chestplate", null);
        api.setItemSlot(playerId, 48, "Diamond Gauntlets", null);
        api.setItemSlot(playerId, 49, "Diamond Leggings", null);
        api.setItemSlot(playerId, 50, "Diamond Boots", null);
        api.setItemSlot(playerId, 0, "Diamond Sword", 1);

        for (let slot = 1; slot <= 45; slot++) {
            api.setItemSlot(playerId, slot, "Splash Instant Healing Potion II", null);
        }

        return false;
    }

    return true;
};

function onPlayerDropItem(playerId, x, y, z, itemName, itemAmount, fromIdx) {
    const blocked = [
        "Diamond Sword", "Splash Instant Healing Potion II", "Diamond Helmet",
        "Diamond Chestplate", "Diamond Gauntlets",
        "Diamond Leggings", "Diamond Boots"
    ];

    if (blocked.includes(itemName)) {
        return "preventDrop";
    }
}
